
from fastapi import APIRouter, HTTPException
from typing import List
from app import schemas, crud

router = APIRouter()

@router.get("/items", response_model=List[schemas.Item])
def list_items():
    return crud.list_items()

@router.post("/items", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate):
    return crud.create_item(item)

@router.get("/items/{item_id}", response_model=schemas.Item)
def get_item(item_id: int):
    it = crud.get_item(item_id)
    if not it:
        raise HTTPException(status_code=404, detail="Item not found")
    return it

@router.put("/items/{item_id}", response_model=schemas.Item)
def update_item(item_id: int, item: schemas.ItemCreate):
    return crud.update_item(item_id, item)

@router.delete("/items/{item_id}")
def delete_item(item_id: int):
    crud.delete_item(item_id)
    return {"status": "deleted"}
