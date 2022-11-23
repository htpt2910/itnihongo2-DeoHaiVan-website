from typing import List

from app.crud import crud_post, crud_user
from app.db.databases import SessionLocal, engine
from app.models import comment, place, post, user
from app.models.user import User
from app.schemas import post as post_schema
from app.schemas import user as user_schema
from app.seed import Seed_db
from fastapi import Depends, status, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.crud import crud_comment
from app.schemas import comment as comment_schema

user.Base.metadata.create_all(bind=engine)
comment.Base.metadata.create_all(bind=engine)
post.Base.metadata.create_all(bind=engine)
place.Base.metadata.create_all(bind=engine)

try:
    Seed_db (SessionLocal)
except:
    print("Already seeded!!!")

app = FastAPI()

origins = [
  "http://localhost:3001",
  "http://localhost:3000",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
      yield db
    finally:
      db.close()

@app.get("/")
async def main():
  return "Helloooo"

@app.post("/user/", response_model=user_schema.User)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = crud_user.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    return crud_user.create_user(db=db, user=user)
@app.get("/users/", response_model=List[user_schema.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud_user.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=user_schema.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud_user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
@app.patch("/user/{user_id}", response_model=user_schema.User)
def update_user(user_id: int, _user: user_schema.UserUpdate, db: Session = Depends(get_db)):
      db_user = db.get(User, user_id)
      if not db_user:
          raise HTTPException(status_code=404, detail="User not found")
      user_data = _user.dict(exclude_unset=True)
      for key, value in user_data.items():
          setattr(db_user, key, value)

      db.add(db_user)
      db.commit()
      db.refresh(db_user)
      return db_user    

@app.get("/posts/", response_model = List[post_schema.Post])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = crud_post.get_posts(db, skip=skip, limit=limit)
    return posts

@app.post("/post/", response_model=post_schema.Post)
def create_post(post: post_schema.PostCreate, db: Session = Depends(get_db)):
    return crud_post.create_post(db=db, post=post)
    
@app.get("/posts/{post_id}", response_model=post_schema.Post)
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud_post.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="post not found")
    return db_post

@app.delete("/post/{post_id}")
def delete_post(post_id:int,  db: Session = Depends(get_db)):
   
    return crud_post.delete_post(db=db, post_id=post_id)

# @app.delete("/user/posts/{post_id}")

@app.delete("/user/{user_id}")
def delete_user(user_id:int,  db: Session = Depends(get_db)):
   
    return crud_user.delete_user(db=db, user_id=user_id)

@app.delete("/comment/{comment_id}")
def delete_comment(comment_id:int,  db: Session = Depends(get_db)):
   
    return crud_comment.delete_comment(db=db, comment_id=comment_id)
