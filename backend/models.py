from sqlalchemy import *

from database import Base

class Users(Base):
    __tablename__ = "USERS"

    id = Column(String, primary_key=True, index=True)
    pw = Column(String)
    firstName = Column(String)
    lastName = Column(String)
    adminFlag = Column(Boolean)
