# Personalized Diet & Exercise Planner from Meal Images

## Project Idea

Users upload a meal image.  
The system detects the meal, estimates nutritional values (calories, carbs, protein, etc.), and suggests personalized diet & exercise recommendations.

---

## ✨ Features
- 📸 **Meal Image Recognition** – Detects food items from photos using a fine-tuned ResNet50 model.
- 🔍 **Calorie & Macro Estimation** – Nutrition mapping for Sri Lankan and international dishes.
- 🧠 **Explainable AI (XAI)** – Grad-CAM heatmaps showing why the model predicted a certain dish.
- 🏃 **Personalized Plans** – Diet & workout suggestions tailored to your goals.
- 💬 **LLM Integration** – Human-friendly reasoning for each recommendation.
- ⚡ **REST API** – Flask backend with MongoDB storage.
- 🌐 **Responsive Frontend** – Clean and easy-to-use web interface.

---

### 2️⃣ Architecture Overview

- **Frontend:** Web/App (React) for uploading images and showing results.
- **Backend API:** Flask serving the model and handling requests.
- **Model:**
  - Food image classification (CNN/Transfer Learning with VGG16, ResNet, or EfficientNet).
  - Calorie estimation using a food database.
- **Recommendation Engine:** Suggests diet & exercise based on detected food and user profile.
- **Explainable AI (XAI):** Use Grad-CAM or SHAP to explain model predictions.
  
---
### Architecture Diagram

<img width="397" height="586" alt="Screenshot 2025-08-07 at 9 16 17 PM" src="https://github.com/user-attachments/assets/e6a24d07-4bab-4ac1-abe4-3204d4cc1eef" />

---

### 3️⃣ Tech Stack

| Component | Technology Options           |
| --------- | ---------------------------- |
| Frontend  | Next.js                     |
| Backend   | FastAPI                      |
| Database  | SQLite                     |
| Model     | TensorFlow                   |
| XAI       | Grad-CAM visualization       |

---


### Team Members

| ID         | Name                  |
| ---------- | --------------------- |
| 22ug1-0323 | W.G.K.C. De Mel       |
| 22ug1-0460 | A.V.D. Amarathunga    |
| 22ug1-0459 | S.S.D. Fernando       |
| 22ug1-0281 | P.N.M.S.S. Wijesinghe |
| 22ug1-0471 | K.K.P. Bimsara        |
| 22ug1-0472 | K.G.P. Kavishka       |

---

## 🚀 Installation & Running
```bash
# Clone repo
git clone https://github.com/sahan-23/10_CoreCrew_CCS4310-Personalized-Diet-Exercise-Planner-from-Meal-Images

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd client
npm install
npm run dev

### 4️⃣ Project Deliverables

- ✅ MVP (Frontend + Backend): Image upload → Detect food → Show nutrition → Suggest diet/exercise
- ✅ GitHub Repository: Code + Dataset + Documentation
- ✅ Architecture Diagram: Data flow (Frontend → Backend → Model → XAI → User)
- ✅ README.md: Setup steps, model usage, team roles

---

