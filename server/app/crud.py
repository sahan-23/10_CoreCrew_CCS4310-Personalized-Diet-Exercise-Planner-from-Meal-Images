
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import SessionLocal, engine, Base

# Ensure tables are created
Base.metadata.create_all(bind=engine)

def list_items():
    db = SessionLocal()
    try:
        items = db.query(models.ItemModel).all()
        return items
    finally:
        db.close()

def create_item(item: schemas.ItemCreate):
    db = SessionLocal()
    try:
        obj = models.ItemModel(name=item.name, description=item.description)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj
    finally:
        db.close()

def get_item(item_id: int):
    db = SessionLocal()
    try:
        return db.query(models.ItemModel).filter(models.ItemModel.id == item_id).first()
    finally:
        db.close()

def update_item(item_id: int, item: schemas.ItemCreate):
    db = SessionLocal()
    try:
        obj = db.query(models.ItemModel).filter(models.ItemModel.id == item_id).first()
        if not obj:
            return None
        obj.name = item.name
        obj.description = item.description
        db.commit()
        db.refresh(obj)
        return obj
    finally:
        db.close()

def delete_item(item_id: int):
    db = SessionLocal()
    try:
        obj = db.query(models.ItemModel).filter(models.ItemModel.id == item_id).first()
        if obj:
            db.delete(obj)
            db.commit()
    finally:
        db.close()
