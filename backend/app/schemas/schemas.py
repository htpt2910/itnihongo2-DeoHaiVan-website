from pydantic import BaseModel
from typing import List

class CommentBase(BaseModel):
    content : str
    comment_time : str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    comment_user_id: int
    post_id: int
    is_active: bool

    class Config:
        orm_mode = True

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

class PlaceBase(BaseModel):
    address : str
    name : str

class PlaceCreate(PlaceBase):
    pass

class Place(PlaceBase):
    id: int
    posts: List[Post] = []

    class Config:
        orm_mode = True

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

    class Config:
        orm_mode = True
