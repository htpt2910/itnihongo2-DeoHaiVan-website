from typing import List

from app.crud import crud_post, crud_user
from app.db.databases import SessionLocal, engine
from app.models import comment, place, post, user
from app.models.user import User
from app.schemas import post as post_schema
from app.schemas import user as user_schema
from app.seed import Seed_db
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import fastapi.security as _security
import jwt
from app.core.hasing import Hasher

oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")

JWT_SECRET = "myjwtsecret"

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

# api login
async def authenticate_user(email: str, password: str, db: Session = Depends(get_db)):
    user = await crud_user.get_user_by_email(db, email)

    if not user:
        return False

    if not user.password == Hasher.verify_password(password):
        return False

    return user

async def create_token(user: User):
    user_obj = User.from_orm(user)

    token = jwt.encode(user_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")

@app.post("/api/token")
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = await authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    return await create_token(user)

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

@app.post("/post/", response_model=post_schema.Post)
def create_post(post: post_schema.PostCreate, db: Session = Depends(get_db)):
    return crud_post.create_post(db=db, post=post)