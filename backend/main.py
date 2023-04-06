from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


import models, crud
from database import *

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
		raise HTTPException(status_code=410, detail="User does not exist in system")
	elif result == -2:
		raise HTTPException(status_code=410, detail="Password is incorrect")
	else:
		return result
	