from pydantic import BaseModel
from datetime import date, datetime



class TransactionBase(BaseModel):

    title: str

    amount: float

    type: str

    category: str

    account_id: int

    transaction_date: date



class TransactionCreate(TransactionBase):
    pass



class TransactionUpdate(TransactionBase):
    pass



class TransactionResponse(TransactionBase):

    id: int

    created_at: datetime


    class Config:
        from_attributes = True