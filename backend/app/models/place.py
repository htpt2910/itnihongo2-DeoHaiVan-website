from app.db.databases import Base
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

class Place(Base):
  __tablename__ = "places"

  id = Column(Integer, primary_key=True, index=True)
  address = Column(String)
  name = Column(String)

  posts = relationship("Post", back_populates='place')

