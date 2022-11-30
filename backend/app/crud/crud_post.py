from app.crud import crud_comment, crud_like
from app.models import post as post_model
from app.schemas import post as post_schema
from sqlalchemy.orm import Session


def create_post(db: Session, post: post_schema.PostCreate):
    db_post = post_model.Post(
        title = post.title,
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
    return db.query(post_model.Post).offset(skip).limit(limit).all()

def delete_post(db: Session, post_id):
    crud_comment.delete_comments(db=db, post_id=post_id)
    crud_like.delete_likes(db=db,post_id=post_id)
    db.query(post_model.Post).filter(post_model.Post.id==post_id).delete()
    db.commit()
    return None
    
def delete_all_posts(db:Session, user_id):
    user_posts = db.query(post_model.Post).filter(post_model.Post.user_id==user_id)
    for i in user_posts:
        delete_post(db, i.id)
    db.commit()
    return None
