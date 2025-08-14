import os

class Config:
    SECRET_KEY = 'your-secret-key'
    JWT_SECRET_KEY = 'your-jwt-secret-key'
    MONGODB_SETTINGS = {
        'db': 'planner',
        'host': 'localhost',
        'port': 27017,
        'connect': False
    }
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB