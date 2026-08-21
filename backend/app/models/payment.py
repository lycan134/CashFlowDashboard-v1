from datetime import date

from sqlalchemy import Column, Date, Float, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.database import Base


class Payment(Base):

    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    amount = Column(Float, nullable=False)
    payment_date = Column(Date, nullable=False, default=date.today)
    source_account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    debt_id = Column(Integer, ForeignKey("debts.id"), nullable=True)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=True)
    user = relationship("User", back_populates="payments")
