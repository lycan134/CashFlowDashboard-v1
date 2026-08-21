from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.database import get_db
from app.security import get_current_user

from app.schemas.transaction import (
    TransactionCreate,
    TransactionUpdate,
    TransactionResponse
)

from app.crud import transaction



router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"]
)



# CREATE
@router.post("/", response_model=TransactionResponse)
def add_transaction(
    transaction_data: TransactionCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_transaction = transaction.create_transaction(
        db,
        transaction_data,
        current_user
    )

    if db_transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found"
        )

    return db_transaction



# READ ALL
@router.get("/", response_model=list[TransactionResponse])
def read_transactions(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return transaction.get_transactions(db, current_user)



# READ ONE
@router.get("/{transaction_id}", response_model=TransactionResponse)
def read_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_transaction = transaction.get_transaction(
        db,
        transaction_id,
        current_user
    )


    if db_transaction is None:

        raise HTTPException(
            status_code=404,
            detail="Transaction not found"
        )


    return db_transaction




# UPDATE
@router.put("/{transaction_id}", response_model=TransactionResponse)
def update_transaction(
    transaction_id: int,
    transaction_data: TransactionUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_transaction = transaction.update_transaction(
        db,
        transaction_id,
        transaction_data,
        current_user
    )


    if db_transaction is None:

        raise HTTPException(
            status_code=404,
            detail="Transaction not found"
        )


    return db_transaction




# DELETE
@router.delete("/{transaction_id}")
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    db_transaction = transaction.delete_transaction(
        db,
        transaction_id,
        current_user
    )


    if db_transaction is None:

        raise HTTPException(
            status_code=404,
            detail="Transaction not found"
        )


    return {
        "message": "Transaction deleted successfully"
    }