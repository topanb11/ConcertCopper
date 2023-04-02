from sqlalchemy.sql import text
from sqlalchemy.orm import Session

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