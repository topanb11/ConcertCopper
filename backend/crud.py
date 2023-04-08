import datetime
from sqlalchemy.sql import text
from sqlalchemy.orm import Session
import models
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime

from schemas import *

def get_performing_artist(venue_id: int, db: Session):
    query = """
 		SELECT a.email, a.first_name, a.last_name, a.stage_name, a.manager_email
		FROM showtime s
		INNER JOIN artist a ON s.artist_email = a.email
		WHERE s.venue_id = :venue_id;
    """
    result = db.execute(text(query), {"venue_id": venue_id})
    columns = result.keys()
    return [dict(zip(columns, row)) for row in result]

def get_all_venues(db: Session):
    query = """
        SELECT venue_id, venue_name, venue_location
        FROM venue;
    """
    result = db.execute(text(query))
    columns = result.keys()
    return [dict(zip(columns, row)) for row in result]

def get_reviewsByVenue(venue_id: int, db: Session):
    query = """
        SELECT r.comment, r.datestamp, r.rating, v.venue_name, r.client_email
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
    datestamp = datetime.now()
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

def add_artist(showtime: ShowtimeInfo, db: Session):
	insert_query = '''
		INSERT INTO showtime (venue_id, datestamp, artist_email)
		VALUES (:venue_id, :datestamp, :artist_email)
	'''
	converted_timestamp = datetime.fromtimestamp(showtime.timestamp)

	db.execute(text(insert_query), {
		"venue_id": showtime.venue_id,
		"datestamp": converted_timestamp,
		"artist_email": showtime.artist_email
	})
	db.commit()
