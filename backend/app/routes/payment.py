from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud import payment
from app.database import get_db
from app.security import get_current_user
from app.schemas.payment import PaymentCreate, PaymentResponse


router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


@router.post("/", response_model=PaymentResponse)
def add_payment(payment_data: PaymentCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    created_payment, error = payment.create_payment(db, payment_data, current_user)

    if error:
        raise HTTPException(status_code=400, detail=error)

    return created_payment


@router.get("/", response_model=list[PaymentResponse])
def read_payments(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return payment.get_payments(db, current_user)
