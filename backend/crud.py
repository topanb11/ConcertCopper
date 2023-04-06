from sqlalchemy.sql import text
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

def get_user(db: Session):
	result = db.execute(text("SELECT * FROM users;"))
	columns = result.keys()
	return [dict(zip(columns, row)) for row in result]

def validate_user(email: str, password: str, db: Session):
	exists_query = '''
		SELECT *
		FROM users u
		WHERE u.email=:email
	'''
	query = f'''
		SELECT first_name, last_name, admin_flag
		FROM users u
		WHERE u.email=:email AND u.pw=:password
	'''
	# checking if user exists first
	exists_result = db.execute(text(exists_query), {"email": email})
	if len(exists_result.fetchall()) == 0:
		return -1

	result = db.execute(text(query), {"email": email, "password": password})
	columns = result.keys()
	user = result.fetchone()
	if user:
		return dict(zip(columns, user))
	else:
		return -2

def register_user(email: str, first: str, last: str, password: str, db: Session):
	exists_query = '''
		SELECT *
		FROM users u
		WHERE u.email=:email
	'''

	insert_query = '''
		INSERT INTO users (email, pw, first_name, last_name, admin_flag)
		VALUES (:email, :password, :first, :last, false)
	'''
	# check if user already exists in db
	exists_result = db.execute(text(exists_query), {"email": email})
	if len(exists_result.fetchall()) == 1:
		return -1
	
	db.execute(text(insert_query), {
		"email": email,
		"password": password,
		"first": first,
		"last": last
	})
	db.commit()

def add_venue(name: str, location: str, img: str, db: Session):
	insert_query = '''
		INSERT INTO venue (venue_name, venue_location, venue_img)
		VALUES (:name, :location, :img)
	'''
	db.execute(text(insert_query), {
		"name": name,
		"location": location,
		"img": img
	})
	db.commit()
