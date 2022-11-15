from app.db.databases import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship

class Comment(Base):
  __tablename__ = "comments"

  id = Column(Integer, primary_key=True, index=True)
  comment_user_id = Column(Integer, ForeignKey("users.id"))
  post_id = Column(Integer, ForeignKey("posts.id"))
  content = Column(String)
  comment_time = Column(DateTime)
  is_active = Column(Boolean, default=True)

  user = relationship("User", back_populates="comments")
  post = relationship("Post", back_populates="comments")
