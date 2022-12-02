from pydantic import BaseModel
from typing import List, Optional
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

class PostUpdate(PostBase):
    title: Optional[str] = None
    content: Optional[str] = None
    post_time: Optional[datetime] = None
    place_id: Optional[int] = None
    image: Optional[str] = None
    rating: Optional[int] = None
    is_active: Optional[bool] = False
    is_verify: Optional[bool] = False

    class Config:
        orm_mode = True

class postBase(BaseModel):
    email: str

class postDelete(postBase):
    password: str
