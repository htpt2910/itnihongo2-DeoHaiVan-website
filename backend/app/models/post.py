from app.db.databases import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship

class Post(Base):
  __tablename__ = "posts"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String)
  user_id = Column(Integer, ForeignKey("users.id"))
  content = Column(String)
  post_time = Column(DateTime)
  place_id = Column(Integer, ForeignKey("places.id"))
  image = Column(String)
  rating = Column(Integer)
  is_active = Column(Boolean, default=False)
  is_verify = Column(Boolean, default=False)

  user = relationship("User", back_populates="posts")
  place = relationship("Place", back_populates="posts")
  comments = relationship("Comment", back_populates='post')
  likes = relationship("Like", back_populates='post')

