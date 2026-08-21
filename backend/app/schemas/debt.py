from pydantic import BaseModel
from datetime import datetime



class DebtCreate(BaseModel):

    name: str

    original_amount: float

    monthly_payment: float

    paid_amount: float = 0

    due_date: str

    status: str = "active"




class DebtUpdate(BaseModel):

    name: str

    original_amount: float

    remaining_amount: float

    paid_amount: float

    monthly_payment: float

    due_date: str

    status: str




class DebtResponse(BaseModel):

    id: int

    name: str

    original_amount: float

    remaining_amount: float

    paid_amount: float

    monthly_payment: float

    due_date: str

    status: str

    created_at: datetime



    class Config:

        from_attributes = True