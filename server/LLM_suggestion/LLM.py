import os
import torch                      # NEW: PyTorch instead of TensorFlow
import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv
from transformers import ViTImageProcessor, ViTForImageClassification   # NEW: PyTorch classes

# --------------------------------------------------
# 1.  CONFIGURATION
# --------------------------------------------------
load_dotenv()
GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("API Key not found. Please create a .env file and add your GEMINI_API_KEY.")

genai.configure(api_key=GOOGLE_API_KEY)
LLM_MODEL = genai.GenerativeModel('gemini-1.5-flash')

MODEL_NAME = "ashaduzzaman/vit-finetuned-food101"

# --------------------------------------------------
# 2.  LOAD MODEL  (PyTorch)
# --------------------------------------------------
print("Loading processor...")
processor = ViTImageProcessor.from_pretrained(MODEL_NAME)

print("Loading model...")
cnn_model = ViTForImageClassification.from_pretrained(MODEL_NAME)
print(f"✅ Food-specific model '{MODEL_NAME}' loaded successfully.")

# --------------------------------------------------
# 3.  CORE FUNCTIONS
# --------------------------------------------------
def classify_food_from_image(image_path):
    """Identifies the food in the image using the fine-tuned ViT model."""
    try:
        img = Image.open(image_path).convert("RGB")
        inputs = processor(images=img, return_tensors="pt")  # PyTorch tensors

        with torch.no_grad():
            outputs = cnn_model(**inputs)
        logits = outputs.logits

        predicted_class_idx = logits.argmax(-1).item()
        classified_food_name = cnn_model.config.id2label[predicted_class_idx].replace("_", " ").title()
        return classified_food_name, None
    except Exception as e:
        print(f"Error classifying image: {e}")
        return None, str(e)

def get_suggestions_from_llm(food_name):
    """Generates information for the identified food via Gemini."""
    prompt = (
        f"Provide details for the food item: {food_name}. "
        "Strictly return the response ONLY in the following format, with each item on a new line:\n"
        "food_name: [food name]\n"
        "serving_size_g: [size in grams]\n"
        "calories: [number of calories]\n"
        "sugar_grams: [grams of sugar]\n"
        "sugar_warning: [a short warning in English]\n"
        "cholesterol_warning: [a short warning in English]\n"
        "workout_suggestion: [a short workout suggestion in English]"
    )
    try:
        response = LLM_MODEL.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error communicating with the LLM: {e}"

# --------------------------------------------------
# 4.  MAIN EXECUTION
# --------------------------------------------------
def main(image_to_process):
    if not os.path.exists(image_to_process):
        print(f"Error: The image file was not found at '{image_to_process}'")
        return

    print("Step 1: Analyzing the uploaded food image...")
    food_name, err = classify_food_from_image(image_to_process)
    if err:
        print(f"Classification failed: {err}")
        return

    print(f"Step 2: Food identified as: {food_name}")
    print("Step 3: Generating suggestions...")
    suggestions = get_suggestions_from_llm(food_name)

    print("\n" + "="*40)
    print("         SUGGESTIONS FOR YOUR MEAL")
    print("="*40)
    print(suggestions)
    print("="*40)

if __name__ == "__main__":
    user_uploaded_image = r'food-11 Image Classification Dataset\test\fried_rice\228971.jpg'
    if os.path.exists(user_uploaded_image):
        print(f"DEBUG: Loading image from --> {user_uploaded_image}")
        main(user_uploaded_image)
    else:
        print(f"❌ Please check the path to your image file: '{user_uploaded_image}'")