from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class ShowtimeInfo(BaseModel):
	venue_id: int
	artist_email: str
	timestamp: int

class UserInfo(BaseModel):
	email: str
	first_name: str
	last_name: str

class OrderInfo(BaseModel):
	price: int
	seat_id: int

class PaymentInfo(BaseModel):
	user: UserInfo
	order: List[OrderInfo]