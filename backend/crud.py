import datetime
from sqlalchemy.sql import text
from sqlalchemy.orm import Session
import models
def get_user(db: Session):
	result = db.execute(text("SELECT * FROM users;"))
	columns = result.keys()
	return [dict(zip(columns, row)) for row in result]

def validate_user(email: str, password: str, db: Session):
	query = f'''
		SELECT first_name, last_name, admin_flag
		FROM users u
		WHERE u.email=:email AND u.pw=:password
	'''
	result = db.execute(text(query), {"email": email, "password": password})
	columns = result.keys()
	return [dict(zip(columns, row)) for row in result][0]

def write_review(name:str, comment:str, email:str, rating:int, db:Session):
    review = models.Review(name = name,comment = comment, date = datetime.datetime.utcnow(), email = email, rating = rating)
    db.add(review)
    db.commit()
    db.refresh(review)
    return review 
   

