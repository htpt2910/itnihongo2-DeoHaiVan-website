from pydantic import BaseModel
from typing import List
from app.schemas.comment import Comment
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

    class Config:
        orm_mode = True
