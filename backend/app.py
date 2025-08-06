from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os
import json
from datetime import datetime, timedelta
import uuid

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fitness_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize extensions
db = SQLAlchemy(app)
CORS(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)
    height = db.Column(db.Float)
    goals = db.Column(db.String(100))
    activity_level = db.Column(db.String(50))
    dietary_restrictions = db.Column(db.Text)  # JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Meal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    meal_type = db.Column(db.String(50))  # Breakfast, Lunch, Dinner, Snack
    image_url = db.Column(db.String(500))
    calories = db.Column(db.Float)
    protein = db.Column(db.Float)
    carbs = db.Column(db.Float)
    fat = db.Column(db.Float)
    category = db.Column(db.String(50))  # healthy, moderate, indulgent
    suggested_exercise = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50))  # cardio, strength, flexibility, balance
    description = db.Column(db.Text)
    duration = db.Column(db.Integer)  # in minutes
    calories_burned = db.Column(db.String(50))
    intensity = db.Column(db.String(50))
    image_url = db.Column(db.String(500))
    scheduled_date = db.Column(db.Date)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    weight = db.Column(db.Float)
    calories_consumed = db.Column(db.Float)
    calories_burned = db.Column(db.Float)
    exercises_completed = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Helper functions
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def analyze_meal_image(image_path):
    """Mock meal analysis - in a real app, this would use ML/AI"""
    # This is a mock implementation
    import random
    meal_options = [
        {
            'name': 'Grilled Chicken Salad',
            'calories': 350,
            'protein': 32,
            'carbs': 18,
            'fat': 15,
            'category': 'healthy',
            'suggested_exercise': '30 minutes of light cardio'
        },
        {
            'name': 'Avocado Toast',
            'calories': 280,
            'protein': 10,
            'carbs': 30,
            'fat': 14,
            'category': 'healthy',
            'suggested_exercise': '15 minutes of yoga'
        },
        {
            'name': 'Salmon with Vegetables',
            'calories': 450,
            'protein': 38,
            'carbs': 25,
            'fat': 22,
            'category': 'healthy',
            'suggested_exercise': 'Strength training focusing on upper body'
        }
    ]
    return random.choice(meal_options)

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Fitness Tracker API is running'})

# User routes
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'name': user.name,
        'age': user.age,
        'weight': user.weight,
        'height': user.height,
        'goals': user.goals,
        'activity_level': user.activity_level,
        'dietary_restrictions': json.loads(user.dietary_restrictions) if user.dietary_restrictions else []
    } for user in users])

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'name': user.name,
        'age': user.age,
        'weight': user.weight,
        'height': user.height,
        'goals': user.goals,
        'activity_level': user.activity_level,
        'dietary_restrictions': json.loads(user.dietary_restrictions) if user.dietary_restrictions else []
    })

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(
        name=data['name'],
        age=data.get('age'),
        weight=data.get('weight'),
        height=data.get('height'),
        goals=data.get('goals'),
        activity_level=data.get('activity_level'),
        dietary_restrictions=json.dumps(data.get('dietary_restrictions', []))
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id, 'message': 'User created successfully'}), 201

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    user.name = data.get('name', user.name)
    user.age = data.get('age', user.age)
    user.weight = data.get('weight', user.weight)
    user.height = data.get('height', user.height)
    user.goals = data.get('goals', user.goals)
    user.activity_level = data.get('activity_level', user.activity_level)
    user.dietary_restrictions = json.dumps(data.get('dietary_restrictions', []))
    
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

# Meal routes
@app.route('/api/meals', methods=['GET'])
def get_meals():
    user_id = request.args.get('user_id', type=int)
    if user_id:
        meals = Meal.query.filter_by(user_id=user_id).order_by(Meal.created_at.desc()).all()
    else:
        meals = Meal.query.order_by(Meal.created_at.desc()).all()
    
    return jsonify([{
        'id': meal.id,
        'name': meal.name,
        'type': meal.meal_type,
        'time': meal.created_at.strftime('%I:%M %p'),
        'category': meal.category,
        'image_url': meal.image_url,
        'nutrition': {
            'calories': meal.calories,
            'protein': meal.protein,
            'carbs': meal.carbs,
            'fat': meal.fat
        },
        'suggested_exercise': meal.suggested_exercise
    } for meal in meals])

@app.route('/api/meals', methods=['POST'])
def create_meal():
    data = request.get_json()
    meal = Meal(
        user_id=data['user_id'],
        name=data['name'],
        meal_type=data.get('meal_type'),
        image_url=data.get('image_url'),
        calories=data.get('calories'),
        protein=data.get('protein'),
        carbs=data.get('carbs'),
        fat=data.get('fat'),
        category=data.get('category'),
        suggested_exercise=data.get('suggested_exercise')
    )
    db.session.add(meal)
    db.session.commit()
    return jsonify({'id': meal.id, 'message': 'Meal created successfully'}), 201

@app.route('/api/meals/analyze', methods=['POST'])
def analyze_meal():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No image selected'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Add timestamp to avoid conflicts
        filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Analyze the meal
        analysis = analyze_meal_image(filepath)
        
        return jsonify({
            'name': analysis['name'],
            'calories': analysis['calories'],
            'protein': analysis['protein'],
            'carbs': analysis['carbs'],
            'fat': analysis['fat'],
            'category': analysis['category'],
            'suggested_exercise': analysis['suggested_exercise'],
            'image_url': f'/uploads/{filename}'
        })
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Exercise routes
@app.route('/api/exercises', methods=['GET'])
def get_exercises():
    user_id = request.args.get('user_id', type=int)
    category = request.args.get('category')
    
    query = Exercise.query
    if user_id:
        query = query.filter_by(user_id=user_id)
    if category and category != 'all':
        query = query.filter_by(category=category)
    
    exercises = query.order_by(Exercise.created_at.desc()).all()
    
    return jsonify([{
        'id': exercise.id,
        'name': exercise.name,
        'category': exercise.category,
        'description': exercise.description,
        'duration': exercise.duration,
        'calories_burned': exercise.calories_burned,
        'intensity': exercise.intensity,
        'image_url': exercise.image_url,
        'scheduled_date': exercise.scheduled_date.isoformat() if exercise.scheduled_date else None,
        'completed': exercise.completed
    } for exercise in exercises])

@app.route('/api/exercises', methods=['POST'])
def create_exercise():
    data = request.get_json()
    exercise = Exercise(
        user_id=data['user_id'],
        name=data['name'],
        category=data.get('category'),
        description=data.get('description'),
        duration=data.get('duration'),
        calories_burned=data.get('calories_burned'),
        intensity=data.get('intensity'),
        image_url=data.get('image_url'),
        scheduled_date=datetime.strptime(data['scheduled_date'], '%Y-%m-%d').date() if data.get('scheduled_date') else None
    )
    db.session.add(exercise)
    db.session.commit()
    return jsonify({'id': exercise.id, 'message': 'Exercise created successfully'}), 201

@app.route('/api/exercises/<int:exercise_id>', methods=['PUT'])
def update_exercise(exercise_id):
    exercise = Exercise.query.get_or_404(exercise_id)
    data = request.get_json()
    
    exercise.name = data.get('name', exercise.name)
    exercise.category = data.get('category', exercise.category)
    exercise.description = data.get('description', exercise.description)
    exercise.duration = data.get('duration', exercise.duration)
    exercise.calories_burned = data.get('calories_burned', exercise.calories_burned)
    exercise.intensity = data.get('intensity', exercise.intensity)
    exercise.completed = data.get('completed', exercise.completed)
    
    if data.get('scheduled_date'):
        exercise.scheduled_date = datetime.strptime(data['scheduled_date'], '%Y-%m-%d').date()
    
    db.session.commit()
    return jsonify({'message': 'Exercise updated successfully'})

# Progress routes
@app.route('/api/progress', methods=['GET'])
def get_progress():
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400
    
    # Get last 7 days of progress
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=7)
    
    progress_entries = Progress.query.filter(
        Progress.user_id == user_id,
        Progress.date >= start_date,
        Progress.date <= end_date
    ).order_by(Progress.date).all()
    
    return jsonify([{
        'date': entry.date.isoformat(),
        'weight': entry.weight,
        'calories_consumed': entry.calories_consumed,
        'calories_burned': entry.calories_burned,
        'exercises_completed': entry.exercises_completed
    } for entry in progress_entries])

@app.route('/api/progress', methods=['POST'])
def create_progress():
    data = request.get_json()
    progress = Progress(
        user_id=data['user_id'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        weight=data.get('weight'),
        calories_consumed=data.get('calories_consumed'),
        calories_burned=data.get('calories_burned'),
        exercises_completed=data.get('exercises_completed')
    )
    db.session.add(progress)
    db.session.commit()
    return jsonify({'id': progress.id, 'message': 'Progress recorded successfully'}), 201

# Dashboard routes
@app.route('/api/dashboard/<int:user_id>', methods=['GET'])
def get_dashboard_data(user_id):
    # Get recent meals
    recent_meals = Meal.query.filter_by(user_id=user_id).order_by(Meal.created_at.desc()).limit(5).all()
    
    # Get upcoming exercises
    upcoming_exercises = Exercise.query.filter_by(user_id=user_id).filter(
        Exercise.scheduled_date >= datetime.now().date()
    ).order_by(Exercise.scheduled_date).limit(3).all()
    
    # Calculate nutrition summary
    today = datetime.now().date()
    today_meals = Meal.query.filter(
        Meal.user_id == user_id,
        db.func.date(Meal.created_at) == today
    ).all()
    
    nutrition_summary = {
        'calories': sum(meal.calories or 0 for meal in today_meals),
        'protein': sum(meal.protein or 0 for meal in today_meals),
        'carbs': sum(meal.carbs or 0 for meal in today_meals),
        'fat': sum(meal.fat or 0 for meal in today_meals)
    }
    
    # Get weekly stats
    week_start = today - timedelta(days=today.weekday())
    weekly_exercises = Exercise.query.filter(
        Exercise.user_id == user_id,
        Exercise.scheduled_date >= week_start,
        Exercise.completed == True
    ).count()
    
    return jsonify({
        'recent_meals': [{
            'id': meal.id,
            'name': meal.name,
            'type': meal.meal_type,
            'time': meal.created_at.strftime('%I:%M %p'),
            'category': meal.category,
            'image_url': meal.image_url,
            'nutrition': {
                'calories': meal.calories,
                'protein': meal.protein,
                'carbs': meal.carbs,
                'fat': meal.fat
            },
            'suggested_exercise': meal.suggested_exercise
        } for meal in recent_meals],
        'upcoming_exercises': [{
            'id': exercise.id,
            'name': exercise.name,
            'category': exercise.category,
            'description': exercise.description,
            'duration': exercise.duration,
            'calories_burned': exercise.calories_burned,
            'intensity': exercise.intensity,
            'image_url': exercise.image_url
        } for exercise in upcoming_exercises],
        'nutrition_summary': nutrition_summary,
        'weekly_workouts': weekly_exercises
    })

    with app.app_context():
      db.create_all()
    
    # Create a default user if none exists
    if not User.query.first():
        default_user = User(
            name='Alex Smith',
            age=32,
            weight=75,
            height=175,
            goals='Weight loss',
            activity_level='Moderate',
            dietary_restrictions=json.dumps(['None'])
        )
        db.session.add(default_user)
        db.session.commit()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 