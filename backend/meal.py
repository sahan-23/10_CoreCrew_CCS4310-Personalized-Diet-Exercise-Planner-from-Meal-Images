import os
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Meal, User
from werkzeug.utils import secure_filename
from mongoengine.errors import ValidationError

meal_bp = Blueprint('meal', __name__)

@meal_bp.route('/meals', methods=['POST'])
@jwt_required()
def upload_meal():
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    if 'image' not in request.files:
        return jsonify({'msg': 'No image uploaded'}), 400
    image = request.files['image']
    filename = secure_filename(image.filename)
    image.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
    description = request.form.get('description', '')
    calories = float(request.form.get('calories', 0))
    meal = Meal(user=user, image_filename=filename, description=description, calories=calories)
    try:
        meal.save()
    except ValidationError as e:
        return jsonify({'msg': str(e)}), 400
    return jsonify({'msg': 'Meal uploaded'}), 201

@meal_bp.route('/meals', methods=['GET'])
@jwt_required()
def get_meals():
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    meals = Meal.objects(user=user).order_by('-timestamp')
    return jsonify([
        {
            'id': str(m.id),
            'image_url': f"/uploads/{m.image_filename}",
            'description': m.description,
            'calories': m.calories,
            'timestamp': m.timestamp
        } for m in meals
    ])