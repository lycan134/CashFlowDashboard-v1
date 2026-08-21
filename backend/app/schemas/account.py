from pydantic import BaseModel
from datetime import date


class AccountBase(BaseModel):

    name: str
    type: str
    balance: float
    credit_limit: float | None = None
    due_date: date | None = None
    payment_due_day: int | None = None



class AccountCreate(AccountBase):
    pass



class AccountUpdate(AccountBase):
    pass



class AccountResponse(AccountBase):

    id: int


    class Config:
        from_attributes = True