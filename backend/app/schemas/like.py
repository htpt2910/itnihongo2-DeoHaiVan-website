from pydantic import BaseModel
from datetime import datetime

class LikeBase(BaseModel):
    like_user_id: int
    post_id: int

class CommentCreate(LikeBase):
    pass

class Comment(LikeBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
