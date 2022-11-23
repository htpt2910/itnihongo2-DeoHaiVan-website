from app.db.databases import Base
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  username = Column(String, unique=True, index=True)
  email = Column(String, unique=True, index=True)
  name = Column(String)
  gender = Column(Boolean, default=True)
  age = Column(Integer)
  image = Column(String)
  hashed_password = Column(String)
  is_active = Column(Boolean, default=True)

  comments = relationship("Comment", back_populates='user')
  likes = relationship("Like", back_populates='user')
  posts = relationship("Post", back_populates='user')

