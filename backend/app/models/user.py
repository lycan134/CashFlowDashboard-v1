from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    accounts = relationship("Account", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")
    debts = relationship("Debt", back_populates="user")
    payments = relationship("Payment", back_populates="user")