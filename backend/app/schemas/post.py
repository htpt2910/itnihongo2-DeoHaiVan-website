from pydantic import BaseModel
from typing import List
from app.schemas.comment import Comment
from app.schemas.like import Like
from datetime import datetime

class PostBase(BaseModel):
    content : str
    post_time : datetime
    image : str
    rating : int
    user_id: int
    place_id: int
    
class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    is_active: bool
    comments: List[Comment] = []
    likes : List[Like] = []


class postBase(BaseModel):
    email: str


class postDelete(postBase):
    password: str


class post(postBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
#class postDelete(PostBase):
#     id: int
