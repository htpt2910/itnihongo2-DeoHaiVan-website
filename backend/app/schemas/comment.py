from pydantic import BaseModel
from datetime import datetime

class CommentBase(BaseModel):
    content : str
    comment_time : datetime
    comment_user_id: int
    post_id: int

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
