# Fitness Tracker Backend

A Flask-based REST API backend for the fitness and nutrition tracking application.

## Features

- **User Management**: Create, read, and update user profiles
- **Meal Tracking**: Upload meal images and analyze nutrition
- **Exercise Planning**: Manage workout routines and schedules
- **Progress Tracking**: Monitor fitness progress over time
- **Dashboard Analytics**: Get comprehensive fitness insights

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application:**
   ```bash
   python app.py
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Users
- `GET /api/users` - Get all users
- `GET /api/users/<id>` - Get specific user
- `POST /api/users` - Create new user
- `PUT /api/users/<id>` - Update user

### Meals
- `GET /api/meals?user_id=<id>` - Get user's meals
- `POST /api/meals` - Create new meal
- `POST /api/meals/analyze` - Analyze meal image (multipart form)

### Exercises
- `GET /api/exercises?user_id=<id>&category=<category>` - Get exercises
- `POST /api/exercises` - Create new exercise
- `PUT /api/exercises/<id>` - Update exercise

### Progress
- `GET /api/progress?user_id=<id>` - Get user's progress
- `POST /api/progress` - Record progress

### Dashboard
- `GET /api/dashboard/<user_id>` - Get dashboard data

## Database Schema

### Users
- `id` (Primary Key)
- `name` (String)
- `age` (Integer)
- `weight` (Float)
- `height` (Float)
- `goals` (String)
- `activity_level` (String)
- `dietary_restrictions` (JSON)
- `created_at` (DateTime)
- `updated_at` (DateTime)

### Meals
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `name` (String)
- `meal_type` (String)
- `image_url` (String)
- `calories` (Float)
- `protein` (Float)
- `carbs` (Float)
- `fat` (Float)
- `category` (String)
- `suggested_exercise` (Text)
- `created_at` (DateTime)

### Exercises
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `name` (String)
- `category` (String)
- `description` (Text)
- `duration` (Integer)
- `calories_burned` (String)
- `intensity` (String)
- `image_url` (String)
- `scheduled_date` (Date)
- `completed` (Boolean)
- `created_at` (DateTime)

### Progress
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `date` (Date)
- `weight` (Float)
- `calories_consumed` (Float)
- `calories_burned` (Float)
- `exercises_completed` (Integer)
- `created_at` (DateTime)

## File Upload

The application supports image uploads for meal analysis:
- Supported formats: PNG, JPG, JPEG, GIF
- Maximum file size: 16MB
- Upload directory: `uploads/`

## Development

### Environment Variables

Create a `.env` file in the backend directory:
```
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///fitness_tracker.db
```

### Database

The application uses SQLite by default. The database file (`fitness_tracker.db`) will be created automatically when you first run the application.

## CORS Configuration

The backend is configured with CORS to allow requests from the React frontend. The frontend should be running on `http://localhost:3000` or `http://localhost:5173` (Vite default).

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Testing

You can test the API endpoints using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example curl commands:
```bash
# Health check
curl http://localhost:5000/api/health

# Get users
curl http://localhost:5000/api/users

# Get dashboard data for user 1
curl http://localhost:5000/api/dashboard/1
```

## Production Deployment

For production deployment, consider:
1. Using a production WSGI server (Gunicorn, uWSGI)
2. Setting up a proper database (PostgreSQL, MySQL)
3. Configuring environment variables
4. Setting up proper logging
5. Implementing authentication and authorization
6. Using HTTPS
7. Setting up proper CORS policies 