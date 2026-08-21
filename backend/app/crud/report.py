from sqlalchemy.orm import Session

from app.models.transaction import Transaction
from app.models.account import Account
from app.models.debt import Debt



def get_summary(
    db: Session,
    current_user
):


    accounts = db.query(Account).filter(Account.user_id == current_user.id).all()
    assets = sum(
        account.balance
        for account in accounts
        if account.type != "credit_card"
    )
    credit_card_liabilities = sum(
        account.balance
        for account in accounts
        if account.type == "credit_card"
    )



    income = (
        db.query(Transaction)
        .filter(
            Transaction.type == "income",
            Transaction.user_id == current_user.id
        )
        .all()
    )


    total_income = sum(
        item.amount
        for item in income
    )



    expenses = (
        db.query(Transaction)
        .filter(
            Transaction.type == "expense",
            Transaction.user_id == current_user.id
        )
        .all()
    )


    total_expense = sum(
        item.amount
        for item in expenses
    )



    debts = db.query(Debt).filter(Debt.user_id == current_user.id).all()
    total_debt = sum(item.remaining_amount for item in debts)
    total_liabilities = credit_card_liabilities + total_debt



    return {

        "total_balance": assets,

        "total_income": total_income,

        "total_expense": total_expense,

        "total_debt": total_debt,

        "total_assets": assets,

        "total_liabilities": total_liabilities,

        "net_worth": assets - total_liabilities,

        "monthly_remaining": total_income - total_expense

    }


def get_categories(db: Session, current_user):

    transactions = (
        db.query(Transaction)
        .filter(Transaction.type == "expense", Transaction.user_id == current_user.id)
        .all()
    )
    totals = {}

    for transaction in transactions:
        totals[transaction.category] = totals.get(transaction.category, 0) + transaction.amount

    return [
        {"category": category, "amount": amount}
        for category, amount in sorted(totals.items(), key=lambda item: item[1], reverse=True)
    ]


def get_upcoming_payments(db: Session, current_user):

    debts = (
        db.query(Debt)
        .filter(Debt.status != "Paid", Debt.remaining_amount > 0, Debt.user_id == current_user.id)
        .order_by(Debt.due_date)
        .all()
    )

    return [
        {
            "name": debt.name,
            "amount": min(debt.monthly_payment, debt.remaining_amount),
            "due_date": debt.due_date,
            "status": debt.status
        }
        for debt in debts
    ]


def get_recent_transactions(db: Session, current_user):

    transactions = (
        db.query(Transaction)
        .filter(Transaction.user_id == current_user.id)
        .order_by(Transaction.transaction_date.desc(), Transaction.id.desc())
        .limit(10)
        .all()
    )

    return [
        {
            "id": transaction.id,
            "title": transaction.title,
            "category": transaction.category,
            "account": transaction.account.name if transaction.account else "Account unavailable",
            "date": transaction.transaction_date,
            "amount": transaction.amount,
            "type": transaction.type
        }
        for transaction in transactions
    ]


def get_dashboard(db: Session, current_user):

    return {
        "summary": get_summary(db, current_user),
        "categories": get_categories(db, current_user),
        "upcoming_payments": get_upcoming_payments(db, current_user),
        "recent_transactions": get_recent_transactions(db, current_user),
        "accounts": db.query(Account).filter(Account.user_id == current_user.id).all()
    }