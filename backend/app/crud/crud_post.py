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