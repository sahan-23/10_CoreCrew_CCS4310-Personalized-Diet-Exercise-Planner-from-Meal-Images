from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/recommendations', methods=['GET'])
@jwt_required()
def get_recommendations():
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()
    # Dummy logic for recommendations
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    recs = {
        'diet': f"Eat more vegetables, {user.username}!",
        'exercise': "Try 30 minutes of walking daily."
    }
    return jsonify(recs)