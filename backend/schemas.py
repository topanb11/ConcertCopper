from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    
class User(UserBase):
    id: str
    pw: str
    firstName: str
    lastName: str
    adminFlag: bool