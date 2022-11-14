from pydantic import BaseModel
from typing import List
from app.schemas.comment import Comment
class PostBase(BaseModel):
    content : str
    post_time : str
    image : str
    rating : str
class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    user_id: int
    place_id: int
    is_active: bool
    comments: List[Comment] = []

    class Config:
        orm_mode = True
