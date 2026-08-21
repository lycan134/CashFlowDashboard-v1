from sqlalchemy import Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Debt(Base):

    __tablename__ = "debts"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String,
        nullable=False
    )


    amount = Column(
        Float,
        nullable=False
    )


    original_amount = Column(
        Float,
        nullable=False,
        default=0
    )


    remaining_amount = Column(
        Float,
        nullable=False,
        default=0
    )


    paid_amount = Column(
        Float,
        default=0
    )


    monthly_payment = Column(
        Float,
        nullable=False,
        default=0
    )


    due_date = Column(
        String,
        nullable=False
    )


    status = Column(
        String,
        default="Active"
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)

    user = relationship("User", back_populates="debts")