from datetime import date

from pydantic import BaseModel


class PaymentCreate(BaseModel):
    amount: float
    payment_date: date
    source_account_id: int
    debt_id: int | None = None
    account_id: int | None = None


class PaymentResponse(PaymentCreate):
    id: int

    class Config:
        from_attributes = True
