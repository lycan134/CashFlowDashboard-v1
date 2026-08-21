from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.security import get_current_user
from app.schemas.account import (
    AccountCreate,
    AccountUpdate,
    AccountResponse
)
from app.crud import account


router = APIRouter(
    prefix="/accounts",
    tags=["Accounts"]
)


def validate_account_data(account_data):

    if account_data.type == "credit_card":
        if account_data.credit_limit is None or account_data.credit_limit <= 0:
            raise HTTPException(
                status_code=422,
                detail="Credit limit is required for credit cards"
            )
        if account_data.payment_due_day is None or not 1 <= account_data.payment_due_day <= 31:
            raise HTTPException(
                status_code=422,
                detail="Payment due day must be between 1 and 31 for credit cards"
            )
    elif account_data.credit_limit is not None:
        account_data.credit_limit = None

    if account_data.type != "credit_card":
        account_data.payment_due_day = None

    return account_data


# CREATE
@router.post("/", response_model=AccountResponse)
def add_account(
    account_data: AccountCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    validate_account_data(account_data)

    return account.create_account(
        db,
        account_data,
        current_user
    )


# READ ALL
@router.get("/", response_model=list[AccountResponse])
def read_accounts(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return account.get_accounts(db, current_user)


# READ ONE
@router.get("/{account_id}", response_model=AccountResponse)
def read_account(
    account_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_account = account.get_account(
        db,
        account_id,
        current_user
    )

    if db_account is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found"
        )

    return db_account


# UPDATE
@router.put("/{account_id}", response_model=AccountResponse)
def update_account(
    account_id: int,
    account_data: AccountUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    validate_account_data(account_data)

    db_account = account.update_account(
        db,
        account_id,
        account_data,
        current_user
    )

    if db_account is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found"
        )

    return db_account


# DELETE
@router.delete("/{account_id}")
def delete_account(
    account_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_account = account.delete_account(
        db,
        account_id,
        current_user
    )

    if db_account is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found"
        )

    return {
        "message": "Account deleted successfully"
    }