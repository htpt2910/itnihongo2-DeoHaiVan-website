from app.models import like as like_model
from app.schemas import like as like_schema
from sqlalchemy.orm import Session

def create_like(db: Session, like: like_schema.LikeCreate):
    db_like = like_model.Like(
        like_user_id=like.like_user_id,
        post_id = like.post_id)
    db.add(db_like)
    db.commit()
    db.refresh(db_like)
    return db_like

def get_like(db: Session, like_id: int):
    return db.query(like_model.Like).filter(like_model.Like.id == like_id).first()

def get_likes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(like_model.Comment).offset(skip).limit(limit).all()
    
def delete_likes(db: Session,post_id):
    db.query(like_model.Like).filter(like_model.Like.post_id==post_id).delete()
    db.commit()
    return None
    
def delete_like(db: Session, like_id):
    db.query(like_model.Like).filter(like_model.Like.id==like_id).delete()
    db.commit()
    return None