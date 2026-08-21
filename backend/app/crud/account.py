from datetime import date

from sqlalchemy.orm import Session

from app.models.account import Account
from app.schemas.account import (
    AccountCreate,
    AccountUpdate
)

from app.utils.date_helpers import get_next_due_date


# CREATE
def create_account(
    db: Session,
    account_data: AccountCreate,
    current_user
):

    new_account = Account(
        user_id=current_user.id,
        name=account_data.name,
        type=account_data.type,
        balance=account_data.balance,
        credit_limit=account_data.credit_limit,
        due_date=(
            get_next_due_date(date.today(), account_data.payment_due_day)
            if account_data.type == "credit_card" and account_data.payment_due_day
            else None
        ),
        payment_due_day=account_data.payment_due_day
    )

    db.add(new_account)

    db.commit()

    db.refresh(new_account)

    return new_account



# READ ALL
def get_accounts(
    db: Session,
    current_user
):

    return db.query(Account).filter(Account.user_id == current_user.id).all()



# READ ONE
def get_account(
    db: Session,
    account_id: int,
    current_user
):

    return (
        db.query(Account)
        .filter(Account.id == account_id, Account.user_id == current_user.id)
        .first()
    )



# UPDATE
def update_account(
    db: Session,
    account_id: int,
    account_data: AccountUpdate,
    current_user
):

    account = get_account(
        db,
        account_id,
        current_user
    )

    if account is None:
        return None


    account.name = account_data.name

    account.type = account_data.type

    account.balance = account_data.balance

    account.credit_limit = account_data.credit_limit
    account.due_date = (
        get_next_due_date(date.today(), account_data.payment_due_day)
        if account_data.type == "credit_card" and account_data.payment_due_day
        else None
    )
    account.payment_due_day = account_data.payment_due_day


    db.commit()

    db.refresh(account)

    return account



# DELETE
def delete_account(
    db: Session,
    account_id: int,
    current_user
):

    account = get_account(
        db,
        account_id,
        current_user
    )

    if account is None:
        return None


    db.delete(account)

    db.commit()

    return account