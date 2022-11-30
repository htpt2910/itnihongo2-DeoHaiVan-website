from datetime import datetime, timedelta
from typing import Any, List, Union

import jwt
from app.core.hasing import Hasher
from app.crud import crud_comment, crud_like, crud_post, crud_user
from app.db.databases import SessionLocal, engine
from app.models import comment, place, post, user
from app.models.post import Post
from app.models.user import User
from app.schemas import login as login_schema
from app.schemas import post as post_schema
from app.schemas import user as user_schema
from app.security import get_current_active_user, validate_token
from app.seed import Seed_db
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

SECURITY_ALGORITHM = 'HS256'
SECRET_KEY = '09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7'

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
  allow_origins=['*'],
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

def authenticate_user(email: str, password: str):
    db = SessionLocal()
    user = crud_user.get_user_by_email(db, email=email)
    if not user:
        return False

    if not Hasher.verify_password(password, user.hashed_password):
        return False
    
    return True

def generate_token(username: Union[str, Any]) -> str:
    expire = datetime.utcnow() + timedelta(
        seconds=60 * 60 * 24 * 3  # Expired after 3 days
    )
    to_encode = {
        "exp": expire, "email": username
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=SECURITY_ALGORITHM)
    return encoded_jwt

@app.post('/login')
def login(request_data: login_schema.LoginRequest):
    print(f'[x] request_data: {request_data.__dict__}')
    if authenticate_user(email=request_data.email, password=request_data.password):
        token = generate_token(request_data.email)
        return {
            'token': token
        }
    else:
        raise HTTPException(status_code=404, detail="Wrong email or password")

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
@app.get("/users/", response_model=List[user_schema.User], dependencies=[Depends(validate_token)])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud_user.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.get("/users/{user_id}", response_model=user_schema.User, dependencies=[Depends(validate_token)])
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud_user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
    
@app.patch("/users/{user_id}", response_model=user_schema.User, dependencies=[Depends(validate_token)])
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

@app.get("/posts/", response_model = List[post_schema.Post], dependencies=[Depends(validate_token)])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = crud_post.get_posts(db, skip=skip, limit=limit)
    return posts

@app.post("/post/", response_model=post_schema.Post, dependencies=[Depends(validate_token)])
def create_post(post: post_schema.PostCreate, db: Session = Depends(get_db)):
    return crud_post.create_post(db=db, post=post)

@app.patch("/post/{post_id}", response_model=post_schema.Post, dependencies=[Depends(validate_token)])
def update_post(post_id: int, _post: post_schema.PostUpdate, db: Session = Depends(get_db)):
      db_post = db.get(Post, post_id)
      if not db_post:
          raise HTTPException(status_code=404, detail="Post not found")
      post_data = _post.dict(exclude_unset=True)
      for key, value in post_data.items():
          setattr(db_post, key, value)

      db.add(db_post)
      db.commit()
      db.refresh(db_post)
      return db_post
    
@app.get("/posts/{post_id}", response_model=post_schema.Post, dependencies=[Depends(validate_token)])
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud_post.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="post not found")
    return db_post

@app.delete("/post/{post_id}", dependencies=[Depends(validate_token)])
def delete_post(post_id:int,  db: Session = Depends(get_db)):
   
    return crud_post.delete_post(db=db, post_id=post_id)

# @app.delete("/user/posts/{post_id}")

@app.delete("/user/{user_id}", dependencies=[Depends(validate_token)])
def delete_user(user_id:int,  db: Session = Depends(get_db)):
   
    return crud_user.delete_user(db=db, user_id=user_id)

@app.delete("/comment/{comment_id}", dependencies=[Depends(validate_token)])
def delete_comment(comment_id:int,  db: Session = Depends(get_db)):
   
    return crud_comment.delete_comment(db=db, comment_id=comment_id)

@app.delete("/like/{like_id}", dependencies=[Depends(validate_token)])
def delete_like(like_id:int,  db: Session = Depends(get_db)):
   
    return crud_like.delete_like(db=db, like_id=like_id)
