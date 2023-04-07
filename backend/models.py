from sqlalchemy import *

from database import Base
from datetime import datetime

class Users(Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, index=True)
    pw = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    admin_flag = Column(Boolean)

class Review(Base):
    __tablename__ = "reviews"
    
    email = Column(String, primary_key=True, index=True)
    name = Column(String)
    comment = Column(String)
    date = Column(DateTime, default = datetime.utcnow)
    rating = Column(Integer)
    venue_ID = Column(Integer)