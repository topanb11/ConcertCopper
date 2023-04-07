import datetime
from sqlalchemy.sql import text
from sqlalchemy.orm import Session
import models
from sqlalchemy.exc import SQLAlchemyError

def get_user(db: Session):
	result = db.execute(text("SELECT * FROM users;"))
	columns = result.keys()
	return [dict(zip(columns, row)) for row in result]

def get_PerformingArtists(venue_id: int, db: Session):
    query = """
 		SELECT a.email, a.first_name, a.last_name, a.stage_name, a.manager_email
		FROM showtime s
		INNER JOIN artists a ON s.artist_email = a.email
		WHERE s.venue_id = :venue_id;
    """
    result = db.execute(text(query), {"venue_id": venue_id})
    columns = result.keys()
    return [dict(zip(columns, row)) for row in result]

def get_AllVenues(db: Session):
    query = """
        SELECT venue_id, venue_name, venue_location
        FROM venue;
    """
    result = db.execute(text(query))
    columns = result.keys()
    return [dict(zip(columns, row)) for row in result]

def get_reviewsByVenue(venue_id: int, db: Session):
    query = """
        SELECT r.comment, r.datestamp, r.rating, v.venue_name
        FROM review r 
        INNER JOIN venue v 
        ON r.venue_id = v.venue_id 
        WHERE v.venue_id = :venue_id
    """
    result = db.execute(text(query), {"venue_id": venue_id})
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
	#return [dict(zip(columns, row)) for row in result][0]
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
 
def write_review(comment: str, rating: int, venue_id: int, client_email: str, db: Session):
    datestamp = datetime.datetime.now()
    insert_query = '''
        INSERT INTO review (comment, rating, venue_id, client_email, datestamp)
        VALUES (:comment, :rating, :venue_id, :client_email, :datestamp)
    '''
    db.execute(text(insert_query), {
        "comment": comment,
        "rating": rating,
        "venue_id": venue_id,
        "client_email": client_email,
        "datestamp": datestamp
    })
    db.commit()
