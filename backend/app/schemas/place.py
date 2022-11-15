from pydantic import BaseModel
from typing import List
from app.schemas.post import Post
class PlaceBase(BaseModel):
    address : str
    name : str

class PlaceCreate(PlaceBase):
    pass

class Place(PlaceBase):
    id: int
    is_active: bool
    posts: List[Post] = []

    class Config:
        orm_mode = True
