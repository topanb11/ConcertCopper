from sqlalchemy import text
from models import *
import pprint

def get_user(db):
	query = "SELECT * FROM USERS;"
	with db.connect() as con:
		data = con.execute(text(query))
		for row in data:
			print(row.__dict__)
