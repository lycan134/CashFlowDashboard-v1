from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    Date,
    ForeignKey
)

from sqlalchemy.orm import relationship

from sqlalchemy.sql import func
from datetime import date

from app.database import Base



class Transaction(Base):

    __tablename__ = "transactions"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    title = Column(
        String,
        nullable=False
    )


    amount = Column(
        Float,
        nullable=False
    )


    type = Column(
        String,
        nullable=False
    )
    # income / expense


    category = Column(
        String,
        nullable=False
    )


    account_id = Column(
        Integer,
        ForeignKey("accounts.id"),
        nullable=False
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )


    account = relationship(
        "Account",
        back_populates="transactions"
    )


    transaction_date = Column(
        Date,
        nullable=False,
        default=date.today
    )

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)

    user = relationship("User", back_populates="transactions")