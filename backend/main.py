import datetime
from fastapi import FastAPI, Depends, HTTPException, Request
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

#@app.post("/review")
#def write_review(name: str, comment: str, email: str, rating: int, db: Session = Depends(get_db)):
    #try:
        #review = {
            #"name": name,
            #"comment": comment,
            #"date": datetime.datetime.utcnow(),
            #"email": email,
            #"rating": rating,
        #}
        #crud.write_review(db=db, review=review)
        #return {"message": "Review created"}
    #except SQLAlchemyError:
        #print(str(SQLAlchemyError))
        #raise HTTPException(status_code=410, detail="Review was not created")


@app.post("/review")
def write_review(name: str, comment: str, email: str, rating: int, db: Session = Depends(get_db)):
    try:
        result=crud.write_review(name=name, comment=comment, email=email, rating=rating, db=db)
        return result
    except SQLAlchemyError:
        print(str(SQLAlchemyError))
        raise HTTPException(status_code=410, detail="Review was not created")
