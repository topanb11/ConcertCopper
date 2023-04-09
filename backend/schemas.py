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

class PaymentInfo(BaseModel):
	user: str
	order: List[SeatInfo]