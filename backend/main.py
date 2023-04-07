from fastapi import FastAPI, Depends, HTTPException
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

@app.get("/")
def read_user(db: Session = Depends(get_db)):
	return crud.get_user(db)

@app.post("/login")
def login_user(email: str, password: str, db: Session = Depends(get_db)):
	result = crud.validate_user(email, password, db)
	if result == -1:
		raise HTTPException(status_code=410, detail="User does not exist in system.")
	elif result == -2:
		raise HTTPException(status_code=420, detail="Password is incorrect.")
	else:
		return result

@app.post("/register")
def register_user(email: str, first: str, last: str, password: str, db: Session = Depends(get_db)):
	result = 0
	if validate_email(email):
		result = crud.register_user(email, password, first, last, db)
		if result == -1:
			raise HTTPException(status_code=415, detail="User already exists in system.")
		return {"message": "Success! Your account has been registered!"}
	else:
		raise HTTPException(status_code=416, detail="Please enter a valid email.")

@app.post("/admin/venue")
def add_venue(name: str, location: str, img:str, db: Session = Depends(get_db)):
	crud.add_venue(name, location, img, db)
	return {"message": "Success! Venue has been added."}

@app.post("/admin/venue/artist")
def add_artist(showtime: ShowtimeInfo = Depends(), db: Session = Depends(get_db)):
	crud.add_artist(showtime, db)
	return {"message": "Success! An artist has been added to the venue."}