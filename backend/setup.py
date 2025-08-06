#!/usr/bin/env python3
"""
Setup script for the Fitness Tracker Backend
This script initializes the database and adds sample data.
"""

import os
import sys
from datetime import datetime, timedelta
import json

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db, User, Meal, Exercise, Progress

def create_sample_data():
    """Create sample data for testing and demonstration."""
    
    with app.app_context():
        # Create database tables
        db.create_all()
        
        # Check if we already have users
        if User.query.first():
            print("Database already has data. Skipping sample data creation.")
            return
        
        print("Creating sample data...")
        
        # Create sample user
        user = User(
            name='Alex Smith',
            age=32,
            weight=75.0,
            height=175.0,
            goals='Weight loss',
            activity_level='Moderate',
            dietary_restrictions=json.dumps(['None'])
        )
        db.session.add(user)
        db.session.commit()
        
        # Create sample meals
        sample_meals = [
            {
                'name': 'Grilled Chicken Salad',
                'meal_type': 'Lunch',
                'image_url': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
                'calories': 350,
                'protein': 32,
                'carbs': 18,
                'fat': 15,
                'category': 'healthy',
                'suggested_exercise': '30 minutes of light cardio like walking or cycling'
            },
            {
                'name': 'Avocado Toast',
                'meal_type': 'Breakfast',
                'image_url': 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
                'calories': 280,
                'protein': 10,
                'carbs': 30,
                'fat': 14,
                'category': 'healthy',
                'suggested_exercise': '15 minutes of yoga or stretching'
            },
            {
                'name': 'Salmon with Vegetables',
                'meal_type': 'Dinner',
                'image_url': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
                'calories': 450,
                'protein': 38,
                'carbs': 25,
                'fat': 22,
                'category': 'healthy',
                'suggested_exercise': 'Strength training focusing on upper body'
            }
        ]
        
        for meal_data in sample_meals:
            meal = Meal(
                user_id=user.id,
                **meal_data
            )
            db.session.add(meal)
        
        # Create sample exercises
        sample_exercises = [
            {
                'name': 'Morning Jog',
                'category': 'cardio',
                'description': 'A light jog to start your day and boost metabolism. Great for cardiovascular health.',
                'duration': 30,
                'calories_burned': '300 kcal',
                'intensity': 'Medium',
                'image_url': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
                'scheduled_date': datetime.now().date() + timedelta(days=1)
            },
            {
                'name': 'Strength Training',
                'category': 'strength',
                'description': 'Full body workout focusing on major muscle groups. Includes squats, deadlifts, and bench press.',
                'duration': 45,
                'calories_burned': '400 kcal',
                'intensity': 'High',
                'image_url': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
                'scheduled_date': datetime.now().date() + timedelta(days=2)
            },
            {
                'name': 'Yoga Session',
                'category': 'flexibility',
                'description': 'Improve flexibility and mindfulness with this relaxing yoga session. Perfect for stress relief.',
                'duration': 40,
                'calories_burned': '200 kcal',
                'intensity': 'Low',
                'image_url': 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
                'scheduled_date': datetime.now().date() + timedelta(days=3)
            }
        ]
        
        for exercise_data in sample_exercises:
            exercise = Exercise(
                user_id=user.id,
                **exercise_data
            )
            db.session.add(exercise)
        
        # Create sample progress entries
        for i in range(7):
            date = datetime.now().date() - timedelta(days=i)
            progress = Progress(
                user_id=user.id,
                date=date,
                weight=75.0 - (i * 0.1),  # Simulate weight loss
                calories_consumed=1800 + (i * 50),
                calories_burned=300 + (i * 20),
                exercises_completed=1 if i % 2 == 0 else 0
            )
            db.session.add(progress)
        
        db.session.commit()
        print("Sample data created successfully!")
        print(f"Created user: {user.name} (ID: {user.id})")
        print(f"Created {len(sample_meals)} sample meals")
        print(f"Created {len(sample_exercises)} sample exercises")
        print(f"Created 7 days of progress data")

if __name__ == '__main__':
    create_sample_data() 