from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

import models, crud
from database import *

app = FastAPI()

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

@app.post("/user/login/")
def login_user(email: str, password: str, db: Session = Depends(get_db)):
	result = crud.validate_user(email, password, db)
	if len(result) == 0:
		raise HTTPException(status_code=410, detail="User does not exist in system")
	else:
		return result