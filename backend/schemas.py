from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class ShowtimeInfo(BaseModel):
	venue_id: int
	artist_email: str
	timestamp: int

class SeatInfo(BaseModel):
	seat_id: int
	seat_name: str
	datestamp: int
	price: int

class UserInfo(BaseModel):
	email: str
	password: str
	first: str | None
	last: str | None

class PaymentInfo(BaseModel):
	user: str
	order: List[SeatInfo]
 
class ReviewInfo(BaseModel):
    comment: str
    rating: int
    venue_id:int
    client_email: str

class VenueInfo(BaseModel):
    venue_name: str
    venue_location: str
    venue_img: str
    venue_description: str