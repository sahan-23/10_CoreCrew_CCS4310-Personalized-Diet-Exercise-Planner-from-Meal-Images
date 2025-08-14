# Personalized Diet & Exercise Planner from Meal Images

## Project Idea

Users upload a meal image.  
The system detects the meal, estimates nutritional values (calories, carbs, protein, etc.), and suggests personalized diet & exercise recommendations.

---

## 🏗️ Project Development Plan

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

### 2️⃣ Architecture Overview

- **Frontend:** Web/App (React) for uploading images and showing results.
- **Backend API:** Flask serving the model and handling requests.
- **Model:**
  - Food image classification (CNN/Transfer Learning with VGG16, ResNet, or EfficientNet).
  - Calorie estimation using a food database.
- **Recommendation Engine:** Suggests diet & exercise based on detected food and user profile.
- **Explainable AI (XAI):** Use Grad-CAM or SHAP to explain model predictions.

---

### 3️⃣ Tech Stack

| Component | Technology Options           |
| --------- | ---------------------------- |
| Frontend  | React.js                     |
| Backend   | Flask                        |
| Database  | FMongoDB                     |
| Model     | TensorFlow                   |
| XAI       | Grad-CAM visualization       |

---

### 4️⃣ Project Deliverables

- ✅ MVP (Frontend + Backend): Image upload → Detect food → Show nutrition → Suggest diet/exercise
- ✅ GitHub Repository: Code + Dataset + Documentation
- ✅ Architecture Diagram: Data flow (Frontend → Backend → Model → XAI → User)
- ✅ Video Presentation: 5 mins architecture + 5 mins demo
- ✅ README.md: Setup steps, model usage, team roles

---

