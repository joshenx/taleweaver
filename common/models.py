from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Date, DateTime
from sqlalchemy.sql import func

from common.database import Base

class Users(Base):
    __tablename__ = "users"

    userid = Column(Integer, primary_key=True, index=True, autoincrement=True)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    createdat = Column(DateTime(timezone=True), server_default=func.now())

class Instrument(Base):
    __tablename__ = "instruments"

    instid = Column(Integer, primary_key=True, index=True, autoincrement=True)
    instname = Column(String, nullable=False)
    symbol = Column(String, nullable=False, unique=True)
    type = Column(String)
    country = Column(String)
    sector = Column(String)
    createdat = Column(DateTime(timezone=True), server_default=func.now())
    updatedat = Column(DateTime(timezone=True), onupdate=func.now())

    def toJson(self):
        return {
            'symbol': self.symbol,
            'instname': self.instname,
            'type': self.type,
            'country': self.country,
            'sector': self.sector,
            'createdat': self.createdat,
            'updatedat': self.updatedat
        }
    
    def getJsonSummary(self):
        return {
            'instid': self.instid,
            'symbol': self.symbol,
            'type': self.type,
            'country': self.country,
            'sector': self.sector,
        }


class Price(Base):
    __tablename__ = "prices"

    pricedate = Column(Date, primary_key=True)
    instid = Column(Integer, ForeignKey("instruments.instid"), primary_key=True)
    price = Column(Float, nullable=False)


class Funds(Base):
    __tablename__ = "funds"

    fundid = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fundname = Column(String, nullable=False, unique=True)

class Position(Base):
    __tablename__ = "positions"

    fundid = Column(Integer, ForeignKey("funds.fundid"), primary_key=True)
    year = Column(Integer, primary_key=True)
    month = Column(Integer, primary_key=True)
    instid = Column(Integer, ForeignKey("instruments.instid"), primary_key=True)
    price = Column(Float, nullable=False)
    quantity = Column(Float, nullable=False)
    pnl = Column(Float, nullable=False)
    marketvalue = Column(Float, nullable=False)
    createdat = Column(DateTime(timezone=True), server_default=func.now())
    updatedat = Column(DateTime(timezone=True), onupdate=func.now())
