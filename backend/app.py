import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from mongoengine import connect
from config import Config
from auth import auth_bp
from meal import meal_bp
from recommendations import recommendations_bp
from models import User



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    JWTManager(app)
    connect(**app.config['MONGODB_SETTINGS'])

    # Ensure upload folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(meal_bp, url_prefix='/api')
    app.register_blueprint(recommendations_bp, url_prefix='/api')

    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    @app.route('/api/profile', methods=['GET', 'POST'])
    @jwt_required()
    def profile():
        from flask import request, jsonify
        from flask_jwt_extended import get_jwt_identity
        user_id = get_jwt_identity()
        user = User.objects(id=user_id).first()
        if request.method == 'GET':
            if not user:
                return jsonify({'msg': 'User not found'}), 404
            return jsonify({
                'username': user.username,
                'email': user.email,
                'age': user.age,
                'height': user.height,
                'weight': user.weight,
                'activity_level': user.activity_level
            })
        else:
            data = request.json
            user.age = data.get('age', user.age)
            user.height = data.get('height', user.height)
            user.weight = data.get('weight', user.weight)
            user.activity_level = data.get('activity_level', user.activity_level)
            user.save()
            return jsonify({'msg': 'Profile updated'})

    @app.route('/')
    def index():
        return 'Backend is running. Use the /api endpoints.', 200

    return app

if __name__ == '__main__':
    app = create_app()
    print(app.url_map)  # Print all registered routes for debugging
    app.run(debug=True)