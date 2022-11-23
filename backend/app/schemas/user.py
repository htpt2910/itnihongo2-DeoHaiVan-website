from pydantic import BaseModel
from typing import List
from app.schemas.comment import Comment
from app.schemas.post import Post
from app.schemas.like import Like
class UserBase(BaseModel):
    email: str
    username : str
    name : str
    gender : bool
    age : int
    image : str

class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    comments: List[Comment] = []
    posts: List[Post] = []
    likes: List[Like] = []

    class Config:
        orm_mode = True
