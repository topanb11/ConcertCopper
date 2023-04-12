import datetime
from sqlalchemy.sql import text
from sqlalchemy.orm import Session
import models
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime

from schemas import *


def get_performing_artists(venue_id: int, db: Session):
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
        SELECT venue_id, venue_name, venue_location, venue_description, venue_img
        FROM venue;
    """
    result = db.execute(text(query))
    columns = result.keys()
    return [dict(zip(columns, row)) for row in result]


def get_venue_reviews(venue_id: int, db: Session):
    query = """
        SELECT r.comment, r.datestamp, EXTRACT(epoch FROM datestamp) AS unix_timestamp, r.rating, u.first_name, u.last_name
        FROM review r
        JOIN venue v
        ON r.venue_id = v.venue_id
        JOIN users u
        ON r.client_email = u.email
        WHERE v.venue_id = :venue_id
    """

    result = db.execute(text(query), {"venue_id": venue_id})
    columns = result.keys()
    return [dict(zip(columns, row)) for row in result]


def validate_user(user: UserInfo, db: Session):
    exists_query = '''
        SELECT *
        FROM users u
        WHERE u.email=:email
    '''
    query = '''
        SELECT u.first_name, u.last_name, u.admin_flag, u.email
        FROM users u
        WHERE u.email=:email AND u.pw=:password
    '''
    # checking if user exists first
    exists_result = db.execute(text(exists_query), {"email": user.email})
    if len(exists_result.fetchall()) == 0:
        return -1

    result = db.execute(text(query), {"email": user.email, "password": user.password})
    columns = result.keys()
    user = result.fetchone()
    if user:
        return dict(zip(columns, user))
    else:
        return -2


def register_user(user: UserInfo, db: Session):
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
    exists_result = db.execute(text(exists_query), {"email": user.email})
    if len(exists_result.fetchall()) == 1:
        return -1

    db.execute(text(insert_query), {
        "email": user.email,
        "password": user.password,
        "first": user.first,
        "last": user.last
    })
    db.commit()

def process_order(payment_info: PaymentInfo, db: Session):
	query = '''
	WITH 
		showtime_seats AS (
			SELECT seat.*, showtime.showtime_id AS st_showtime_id
			FROM seat 
			JOIN showtime ON seat.showtime_id = showtime.showtime_id 
		),
		selected_showtime AS (
			SELECT s.showtime_id
			FROM showtime_seats s
			WHERE s.seat_id = :seat_id 
		),
		inserted_order AS (
			INSERT INTO orders (total, client_email, showtime_id)
			VALUES (:total, :email, (SELECT showtime_id FROM selected_showtime))
			RETURNING order_id
		)
		
	UPDATE seat
	SET order_id = inserted_order.order_id
	FROM inserted_order
	WHERE seat_id IN :id_list;
    '''
	id_list = []
	total = 0
	for seat in payment_info.order:
		total += seat.price
		id_list.append(seat.seat_id)
    
	db.execute(text(query), {
        "seat_id": id_list[0],
		"id_list": tuple(id_list),
        "total": total,
        "email": payment_info.user
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


def write_review(review_info: ReviewInfo, db: Session):
    datestamp = datetime.now()
    insert_query = '''
        INSERT INTO review (comment, rating, venue_id, client_email, datestamp)
        VALUES (:comment, :rating, :venue_id, :client_email, :datestamp)
    '''
    db.execute(text(insert_query), {
        "comment": review_info.comment,
        "rating": review_info.rating,
        "venue_id": review_info.venue_id,
        "client_email": review_info.client_email,
        "datestamp": datestamp
    })
    db.commit()


def get_venue_artists(venue_id: int, db: Session):
    query = '''
    SELECT a.stage_name, s.datestamp, seat.seat_name, seat.price, seat.seat_id
    FROM artist a 
    JOIN showtime s
        ON a.email = s.artist_email
    JOIN seat
        ON s.showtime_id=seat.showtime_id
    WHERE s.venue_id=:id;
    '''
    result = db.execute(text(query), {"id": venue_id})
    prev_artist = db.execute(text(query), {"id": venue_id}).first()[0]
    formatted_result = []
    seats = []
    for row in result:
        curr_artist = row[0]
        if curr_artist == prev_artist:
            seats.append({
                "datestamp": datetime.timestamp(row[1]),
                "seatName": row[2],
                "price": row[3],
                "seatId": row[4]
            })
        else:
            artist = {
                "stageName": prev_artist,
                "seats": seats
            }
            formatted_result.append(artist)
            seats = []
            prev_artist = curr_artist

    # Edge case: Only one artist so append at the end
    if len(formatted_result) == 0:
        formatted_result.append({
            "stageName": prev_artist,
            "seats": seats
        })
    return formatted_result


def add_artist(showtime: ShowtimeInfo, db: Session):
    insert_query = '''
    WITH inserted_showtime AS(   
        INSERT INTO showtime (venue_id, datestamp, artist_email)
        VALUES (:venue_id, :datestamp, :artist_email)
        RETURNING showtime_id
    )
    INSERT INTO seat (seat_name, price, order_id, showtime_id)
    VALUES
        ('1A', 400, null, (SELECT showtime_id FROM inserted_showtime)),
        ('1B', 400, null, (SELECT showtime_id FROM inserted_showtime)),
        ('1C', 400, null, (SELECT showtime_id FROM inserted_showtime)),
        ('2A', 250, null, (SELECT showtime_id FROM inserted_showtime)),
        ('2B', 250, null, (SELECT showtime_id FROM inserted_showtime)),
        ('2C', 250, null, (SELECT showtime_id FROM inserted_showtime)),
        ('3A', 150, null, (SELECT showtime_id FROM inserted_showtime)),
        ('3B', 150, null, (SELECT showtime_id FROM inserted_showtime)),
        ('3C', 150, null, (SELECT showtime_id FROM inserted_showtime))
    '''
    converted_timestamp = datetime.fromtimestamp(showtime.timestamp)

    db.execute(text(insert_query), {
        "venue_id": showtime.venue_id,
        "datestamp": converted_timestamp,
        "artist_email": showtime.artist_email,
    })
    db.commit()

def all_artists(db:Session):
    insert_query = '''
        SELECT stage_name, email
        FROM artist
    '''
    result = db.execute(text(insert_query))
    columns = result.keys()
    return[dict(zip(columns,row)) for row in result]
