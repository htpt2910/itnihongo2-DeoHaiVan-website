from typing import List, Optional

from app.schemas.comment import Comment
from app.schemas.like import Like
from app.schemas.post import Post
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    username : str
    name : str
    gender : bool
    age : int
    image : str

    class Config:
        orm_mode = True

class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True
class User(UserBase):
    id: Optional[int] = None
    is_active: Optional[bool] = None
    comments: List[Comment] = []
    posts: List[Post] = []
    likes: List[Like] = []

    class Config:
        orm_mode = True

class UserUpdate(UserBase):
    username: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None
    gender: Optional[bool] = None
    age: Optional[int] = None
    image: Optional[str] = None

    class Config:
        orm_mode = True