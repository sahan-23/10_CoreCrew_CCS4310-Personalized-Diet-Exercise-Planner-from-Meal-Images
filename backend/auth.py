from flask import Blueprint, request, jsonify
from models import User
from flask_jwt_extended import create_access_token
from mongoengine.errors import NotUniqueError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if not all(k in data for k in ('username', 'email', 'password')):
        return jsonify({'msg': 'Missing fields'}), 400
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    try:
        user.save()
    except NotUniqueError:
        return jsonify({'msg': 'Username or email already exists'}), 409
    return jsonify({'msg': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.objects(username=data.get('username')).first()
    if user and user.check_password(data.get('password')):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({'access_token': access_token}), 200
    return jsonify({'msg': 'Invalid credentials'}), 401

