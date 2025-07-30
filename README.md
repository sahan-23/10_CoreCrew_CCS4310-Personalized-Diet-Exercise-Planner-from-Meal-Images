# Personalized Diet & Exercise Planner from Meal Images

## Project Idea

Users upload a meal image.  
The system detects the meal, estimates nutritional values (calories, carbs, protein, etc.), and suggests personalized diet & exercise recommendations.

---

## 🏗️ Project Development Plan

### 1️⃣ Group Formation

- Form a team of 10 members.
- Ensure at least 2+ specializations are represented (Software Engineering, Information Security, Data Science, Cloud).

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

- **Frontend:** Web/App (React, Flutter, or simple HTML/CSS/JS) for uploading images and showing results.
- **Backend API:** Flask or FastAPI serving the model and handling requests.
- **Model:**
  - Food image classification (CNN/Transfer Learning with VGG16, ResNet, or EfficientNet).
  - Calorie estimation using a food database.
- **Recommendation Engine:** Suggests diet & exercise based on detected food and user profile.
- **Explainable AI (XAI):** Use Grad-CAM or SHAP to explain model predictions.
- **Cloud Deployment:** AWS/GCP/Azure (free tier).

---

### 3️⃣ Tech Stack

| Component | Technology Options           |
| --------- | ---------------------------- |
| Frontend  | React.js / Flutter Web       |
| Backend   | FastAPI / Flask              |
| Database  | Firebase / MongoDB / MySQL   |
| Model     | TensorFlow / PyTorch         |
| XAI       | Grad-CAM visualization       |
| Cloud     | AWS EC2 + S3 or any cloud VM |

---

### 4️⃣ Project Deliverables

- ✅ MVP (Frontend + Backend): Image upload → Detect food → Show nutrition → Suggest diet/exercise
- ✅ GitHub Repository: Code + Dataset + Documentation + Video Demo
- ✅ Architecture Diagram: Data flow (Frontend → Backend → Model → XAI → User)
- ✅ Video Presentation: 5 mins architecture + 5 mins demo
- ✅ README.md: Setup steps, model usage, team roles
- ✅ Presentation Slides: For viva

---

### 🗓️ Timeline (Sprint Plan)

| Step   | Task                                                       |
| ------ | ---------------------------------------------------------- |
| Step 1 | Group formation, dataset collection, finalize architecture |
| Step 2 | Train deep learning model (food recognition)               |
| Step 3 | Build backend API & integrate model                        |
| Step 4 | Develop frontend & connect API                             |
| Step 5 | Test MVP, prepare documentation, video, slides             |

---

### 📌 Instructor

Suchith Gunarathna

### 📅 Due Date

July 30, 2025

### 🎥 Viva Presentation

August 1–7, 2025
