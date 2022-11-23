from pydantic import BaseModel
from typing import List
from app.schemas.comment import Comment
from app.schemas.like import Like
from datetime import datetime
class PostBase(BaseModel):
    title : str
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
    is_verify: bool
    comments: List[Comment] = []
    likes : List[Like] = []

    class Config:
        orm_mode = True
