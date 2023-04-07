from sqlalchemy import *

from database import Base

class Users(Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, index=True)
    pw = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    admin_flag = Column(Boolean)


class Showtime(Base):
    __tablename__ = "showtime"

    showtime_id = Column(Integer, primary_key=True, index=True)
    venue_id = Column(Integer)
    datestamp = Column(DateTime)
    artist_email = Column(String)
