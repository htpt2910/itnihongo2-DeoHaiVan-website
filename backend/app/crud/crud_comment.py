from app.models import comment as comment_model
from app.schemas import comment as comment_schema
from sqlalchemy.orm import Session

def create_comment(db: Session, comment: comment_schema.CommentCreate):
    db_comment = comment_model.Comment(
        comment_user_id=comment.comment_user_id,
        content=comment.content, 
        post_id = comment.post_id, 
        comment_time = comment.comment_time)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def get_comment(db: Session, comment_id: int):
    return db.query(comment_model.Comment).filter(comment_model.Comment.id == comment_id).first()

def get_comments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(comment_model.Comment).offset(skip).limit(limit).all()

def delete_comment(db:Session, comment_id: int):
    db.query(comment_model.Comment).filter(comment_model.Comment.id==comment_id).delete()
    db.commit()
    return None

def delete_comments(db: Session,post_id):
    db.query(comment_model.Comment).filter(comment_model.Comment.post_id==post_id).delete()
    db.commit()
    return None
    