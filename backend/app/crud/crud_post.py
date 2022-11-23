from app.models import post as post_model
from app.schemas import post as post_schema
from sqlalchemy.orm import Session

def create_post(db: Session, post: post_schema.PostCreate):
    db_post = post_model.Post(
        user_id=post.user_id,
        content=post.content, 
        post_time = post.post_time, 
        place_id = post.place_id, 
        image = post.image, 
        rating=post.rating)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_post(db: Session, post_id: int):
    return db.query(post_model.Post).filter(post_model.Post.id == post_id).first()
def get_posts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(post_model.post).offset(skip).limit(limit).all()

def delete_post(db: Session, post: post_schema.postDelete):
    db_post = post_model.post(id=post.id)
    db.delete(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id):
    db.query(post_model.Post).filter(post_model.Post.id==post_id).delete()
    db.commit()
    return None
    
