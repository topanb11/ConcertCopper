from fastapi import FastAPI
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

import models, crud
from database import engine as db

app = FastAPI()


@app.get("/")
def read_user():
    users = crud.get_user(db)
    return {"message": "hi"}
