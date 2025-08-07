from mongoengine import Document, StringField, EmailField, IntField, FloatField, ReferenceField, DateTimeField
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

class User(Document):
    username = StringField(required=True, unique=True, max_length=80)
    email = EmailField(required=True, unique=True)
    password_hash = StringField(required=True)
    age = IntField()
    height = FloatField()
    weight = FloatField()
    activity_level = StringField(max_length=50)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Meal(Document):
    user = ReferenceField(User, required=True, reverse_delete_rule=2)  # CASCADE
    image_filename = StringField()
    description = StringField()
    calories = FloatField()
    timestamp = DateTimeField(default=datetime.datetime.utcnow)