import models

def get_user(db):
	return db.query(models.Users).all()