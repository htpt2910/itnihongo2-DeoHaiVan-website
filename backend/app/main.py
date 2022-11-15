from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.crud import crud_user
from app.db.databases import SessionLocal, engine
from app.models import user, post, comment, place
from app.schemas import user as user_schema
from app.seed import Seed_db

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
