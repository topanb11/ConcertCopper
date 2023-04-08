from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date

app = FastAPI()

class ShowtimeInfo(BaseModel):
		venue_id: int
		artist_email: str
		timestamp: int