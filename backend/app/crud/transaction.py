from sqlalchemy.orm import Session

from app.models.transaction import Transaction
from app.models.account import Account
from app.schemas.transaction import (
    TransactionCreate,
    TransactionUpdate
)



# CREATE
def create_transaction(
    db: Session,
    transaction_data: TransactionCreate,
    current_user
):

    account = db.query(Account).filter(Account.id == transaction_data.account_id, Account.user_id == current_user.id).first()

    if account is None:
        return None

    new_transaction = Transaction(
        user_id=current_user.id,

        title=transaction_data.title,

        amount=transaction_data.amount,

        type=transaction_data.type,

        category=transaction_data.category,

        account_id=transaction_data.account_id,

        transaction_date=transaction_data.transaction_date

    )


    db.add(new_transaction)

    apply_balance_change(account, transaction_data.type, transaction_data.amount)

    db.commit()

    db.refresh(new_transaction)


    return new_transaction


def apply_balance_change(
    account: Account,
    transaction_type: str,
    amount: float,
    reverse: bool = False
):

    direction = 1 if transaction_type == "income" else -1

    if account.type == "credit_card":
        direction *= -1

    if reverse:
        direction *= -1

    account.balance += direction * amount




# READ ALL
def get_transactions(
    db: Session,
    current_user
):

    return db.query(Transaction).filter(Transaction.user_id == current_user.id).all()




# READ ONE
def get_transaction(
    db: Session,
    transaction_id: int,
    current_user
):

    return (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id, Transaction.user_id == current_user.id)
        .first()
    )




# UPDATE
def update_transaction(
    db: Session,
    transaction_id: int,
    transaction_data: TransactionUpdate,
    current_user
):

    transaction = get_transaction(
        db,
        transaction_id,
        current_user
    )


    if transaction is None:
        return None

    old_account = db.query(Account).filter(Account.id == transaction.account_id).first()
    new_account = db.query(Account).filter(Account.id == transaction_data.account_id, Account.user_id == current_user.id).first()

    if new_account is None:
        return None

    if old_account is not None:
        apply_balance_change(old_account, transaction.type, transaction.amount, reverse=True)


    transaction.title = transaction_data.title

    transaction.amount = transaction_data.amount

    transaction.type = transaction_data.type

    transaction.category = transaction_data.category

    transaction.account_id = transaction_data.account_id

    apply_balance_change(new_account, transaction.type, transaction.amount)

    transaction.transaction_date = transaction_data.transaction_date


    db.commit()

    db.refresh(transaction)


    return transaction




# DELETE
def delete_transaction(
    db: Session,
    transaction_id: int,
    current_user
):

    transaction = get_transaction(
        db,
        transaction_id,
        current_user
    )


    if transaction is None:
        return None

    account = db.query(Account).filter(Account.id == transaction.account_id).first()

    if account is not None:
        apply_balance_change(account, transaction.type, transaction.amount, reverse=True)


    db.delete(transaction)

    db.commit()


    return transaction