from sqlalchemy import Column, Date, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from app.database import Base


class Account(Base):

    __tablename__ = "accounts"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String,
        nullable=False
    )


    type = Column(
        String,
        nullable=False
    )


    balance = Column(
        Float,
        default=0
    )


    credit_limit = Column(
        Float,
        nullable=True
    )


    due_date = Column(
        Date,
        nullable=True
    )


    payment_due_day = Column(
        Integer,
        nullable=True
    )


    transactions = relationship(
        "Transaction",
        back_populates="account",
        cascade="all, delete"
    )

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)

    user = relationship("User", back_populates="accounts")