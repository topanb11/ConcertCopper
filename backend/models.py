import datetime as _dt 
import sqlalchemy as _sql

import database as _database


class Contact(_database.Base):
    __tablename__ = "Artist"
    Email = _sql.Column(_sql.String, primary_key = True, index = True, unique = True)
    FirstName =_sql.Column(_sql.String, index = True)
    LastName= _sql.Column(_sql.String, index = True)
    StageName= _sql.Column(_sql.String, index = True)
    ArtistManagerEmail= _sql.Column(_sql.String, index = True)
  
    __tablename__ = "Artist Manager"
    Email = _sql.Column(_sql.String, primary_key = True, index = True, unique = True)
    FirstName =_sql.Column(_sql.String, index = True)
    LastName= _sql.Column(_sql.String, index = True)
    RecordLabel= _sql.Column(_sql.String, index = True)
    
    __tablename__ = "Order"
    OrderId = _sql.Column(_sql.Integer, primary_key = True, index = True, unique = True)
    Totals =_sql.Column(_sql.Float, index = True)
    ClientEmail= _sql.Column(_sql.String, index = True)
    ShowTimeID= _sql.Column(_sql.Integer, index = True)
    
    __tablename__ = "ShowTime"
    ShowTimeID = _sql.Column(_sql.Integer, primary_key = True, index = True, unique = True)
    VenueID =_sql.Column(_sql.Integer, index = True)
    Date= _sql.Column(_sql.String, index = True)
    Time= _sql.Column(_sql.String, index = True)
    ArtistEmail= _sql.Column(_sql.String, index = True)
    
    __tablename__ = "Venue"
    VenueID = _sql.Column(_sql.Integer, primary_key = True, index = True, unique = True)
    Name= _sql.Column(_sql.String, index = True)
    Location= _sql.Column(_sql.String, index = True)

    __tablename__ = "Seat"
    SeatID = _sql.Column(_sql.Integer, primary_key = True, index = True, unique = True)
    Price =_sql.Column(_sql.Float, index = True)
    OrderId= _sql.Column(_sql.Integer, index = True)
    ShowTimeID= _sql.Column(_sql.Integer, index = True)
    
    __tablename__ = "Review"
    Comment = _sql.Column(_sql.Integer, primary_key = True, index = True)
    Date= _sql.Column(_sql.String, primary_key = True, index = True)
    VenueID =_sql.Column(_sql.Integer, primary_key = True, index = True)
    ClientEmail= _sql.Column(_sql.String, primary_key = True, index = True)
    Rating= _sql.Column(_sql.String, index = True)

    __tablename__ = "User"
    Email = _sql.Column(_sql.String, primary_key = True, index = True, unique = True)
    FirstName= _sql.Column(_sql.String, index = True)
    LastName= _sql.Column(_sql.String, index = True)
    isAdmin = _sql.Column(_sql.Boolean, index = True)