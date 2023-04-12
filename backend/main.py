import datetime
from fastapi import FastAPI, Depends, HTTPException, Request
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models, crud
from database import *
from helpers import *
from schemas import *

app = FastAPI()

origins = [
	"http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()


@app.post("/login")
def login_user(user: UserInfo, db: Session = Depends(get_db)):
	result = crud.validate_user(user, db)
	if result == -1:
		raise HTTPException(status_code=410, detail="User does not exist in system.")
	elif result == -2:
		raise HTTPException(status_code=420, detail="Password is incorrect.")
	else:
		return result


@app.post("/register")
def register_user(user: UserInfo, db: Session = Depends(get_db)):
	result = 0
	if validate_email(user.email):
		result = crud.register_user(user, db)
		if result == -1:
			raise HTTPException(status_code=415, detail="User already exists in system.")
		return {"message": "Success! Your account has been registered!"}
	else:
		raise HTTPException(status_code=416, detail="Please enter a valid email.")


@app.get("/venues")
def get_all_venues(db: Session = Depends(get_db)):
	return crud.get_all_venues(db)  


@app.get("/venues/{venueId}")
def get_all_artists(venue_id: int, db: Session = Depends(get_db)):
	return crud.get_venue_artists(venue_id, db)
    

@app.post("/review")
def write_review(review_info: ReviewInfo, db: Session = Depends(get_db)):
	crud.write_review(review_info, db)
	return {"message":"Success! Review has been added."}


@app.post("/checkout")
def process_order(payment_info: PaymentInfo, db: Session = Depends(get_db)):
	crud.process_order(payment_info, db)
	return {"message": "Success! Your payment has been processed."}


@app.get("/reviews/venue_id")
def get_venue_reviews(venue_id:int, db:Session=Depends(get_db)):
	get_reviews = crud.get_venue_reviews(venue_id, db)
	if not get_reviews:
			raise HTTPException(status_code = 410, detail = "No reviews for this venue")
	return get_reviews


@app.post("/admin/venue")
def add_venue(name: str, location: str, img:str, db: Session = Depends(get_db)):
	crud.add_venue(name, location, img, db)
	return {"message": "Success! Venue has been added."}


@app.post("/admin/venue/artist")
def add_artist_to_venue(showtime: ShowtimeInfo, db: Session = Depends(get_db)):
	crud.add_artist(showtime, db)
	return {"message": "Success! An artist has been added to the venue."}


@app.get("/admin/venues")
def get_performing_artists(venue_id:int, db:Session = Depends(get_db)):
	get_artist = crud.get_performing_artists(venue_id, db)
	if not get_artist:
			raise HTTPException(status_code=410,detail="Please enter in an existing venue")
	return get_artist

@app.get("/artists")
def get_artists(db:Session = Depends(get_db)):
    result = crud.all_artists(db)
    return result