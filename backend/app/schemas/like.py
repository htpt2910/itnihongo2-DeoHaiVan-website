from pydantic import BaseModel

class LikeBase(BaseModel):
    like_user_id: int
    post_id: int

class LikeCreate(LikeBase):
    pass

class Like(LikeBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
