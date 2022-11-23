from app.db.databases import Base
from sqlalchemy import Column, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship

class Like(Base):
  __tablename__ = "likes"

  id = Column(Integer, primary_key=True, index=True)
  like_user_id = Column(Integer, ForeignKey("users.id"))
  post_id = Column(Integer, ForeignKey("posts.id"))
  is_active = Column(Boolean, default=True)

  user = relationship("User", back_populates="likes")
  post = relationship("Post", back_populates="likes")
