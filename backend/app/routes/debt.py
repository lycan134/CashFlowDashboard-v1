from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session


from app.database import get_db
from app.security import get_current_user

from app.schemas.debt import (
    DebtCreate,
    DebtUpdate,
    DebtResponse
)

from app.crud import debt



router = APIRouter(

    prefix="/debts",

    tags=["Debts"]

)





@router.post(
    "/",
    response_model=DebtResponse
)
def add_debt(
    debt_data:DebtCreate,
    db:Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return debt.create_debt(
        db,
        debt_data,
        current_user
    )






@router.get(
    "/",
    response_model=list[DebtResponse]
)
def read_debts(
    db:Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return debt.get_debts(db, current_user)






@router.get(
    "/{debt_id}",
    response_model=DebtResponse
)
def read_debt(
    debt_id:int,
    db:Session=Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_debt = debt.get_debt(
        db,
        debt_id,
        current_user
    )


    if db_debt is None:

        raise HTTPException(
            status_code=404,
            detail="Debt not found"
        )


    return db_debt







@router.put(
    "/{debt_id}",
    response_model=DebtResponse
)
def update_debt(
    debt_id:int,
    debt_data:DebtUpdate,
    db:Session=Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_debt = debt.update_debt(
        db,
        debt_id,
        debt_data,
        current_user
    )


    if db_debt is None:

        raise HTTPException(
            status_code=404,
            detail="Debt not found"
        )


    return db_debt


@router.post(
    "/{debt_id}/pay",
    response_model=DebtResponse
)
def pay_debt(
    debt_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_debt = debt.get_debt(db, debt_id, current_user)

    if db_debt is None:
        raise HTTPException(
            status_code=404,
            detail="Debt not found"
        )

    if db_debt.status.lower() == "paid" or db_debt.remaining_amount <= 0:
        raise HTTPException(
            status_code=400,
            detail="Debt is already paid"
        )

    if db_debt.monthly_payment <= 0:
        raise HTTPException(
            status_code=400,
            detail="Monthly payment must be greater than zero"
        )

    return debt.pay_debt(db, debt_id, current_user)






@router.delete(
    "/{debt_id}"
)
def delete_debt(
    debt_id:int,
    db:Session=Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_debt = debt.delete_debt(
        db,
        debt_id,
        current_user
    )


    if db_debt is None:

        raise HTTPException(
            status_code=404,
            detail="Debt not found"
        )


    return {
        "message":"Debt deleted successfully"
    }