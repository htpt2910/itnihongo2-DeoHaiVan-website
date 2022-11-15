from pydantic import BaseModel


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
