from app.core.hasing import Hasher
from app.models import user as user_model
from app.schemas import user as user_schema
from sqlalchemy.orm import Session
from app.crud import crud_post

def get_user(db: Session, user_id: int):
    return db.query(user_model.User).filter(user_model.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(user_model.User).filter(user_model.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(user_model.User).filter(user_model.User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(user_model.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: user_schema.UserCreate):
    fake_hashed_password = Hasher.get_password_hash(user.password)
    db_user = user_model.User(username=user.username, email=user.email, name=user.name, gender = user.gender, age = user.age, image = user.image, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
    
def delete_user(db: Session, user_id):
    crud_post.delete_all_posts(db=db, user_id=user_id)
    db.query(user_model.User).filter(user_model.User.id==user_id).delete()
    db.commit()
    return None

