from sqlalchemy.orm import Session

from app.models.account import Account
from app.models.debt import Debt
from app.models.payment import Payment
from app.models.transaction import Transaction
from app.schemas.payment import PaymentCreate
from app.utils.date_helpers import as_date, get_next_due_date, get_next_month_date


def create_payment(db: Session, payment_data: PaymentCreate, current_user):
    source_account = db.query(Account).filter(Account.id == payment_data.source_account_id, Account.user_id == current_user.id).first()

    if source_account is None:
        return None, "Source account not found"

    if payment_data.amount <= 0:
        return None, "Payment amount must be greater than zero"

    if source_account.balance < payment_data.amount:
        return None, "Insufficient source account balance"

    target_debt = None
    target_account = None

    if payment_data.debt_id is not None:
        target_debt = db.query(Debt).filter(Debt.id == payment_data.debt_id, Debt.user_id == current_user.id).first()
        if target_debt is None:
            return None, "Debt not found"
        if target_debt.remaining_amount <= 0:
            return None, "Debt is already paid"
        if payment_data.amount > target_debt.remaining_amount:
            return None, "Payment exceeds the remaining debt"

    if payment_data.account_id is not None:
        target_account = db.query(Account).filter(Account.id == payment_data.account_id, Account.user_id == current_user.id).first()
        if target_account is None:
            return None, "Credit card account not found"
        if target_account.type != "credit_card":
            return None, "Payment target must be a credit card"
        if target_account.id == source_account.id:
            return None, "Source and target accounts must be different"
        if payment_data.amount > target_account.balance:
            return None, "Payment exceeds the credit card balance"

    if target_debt is None and target_account is None:
        return None, "A debt or credit card target is required"

    source_account.balance -= payment_data.amount

    if target_debt is not None:
        target_debt.remaining_amount -= payment_data.amount
        target_debt.paid_amount += payment_data.amount
        if target_debt.remaining_amount <= 0:
            target_debt.remaining_amount = 0
            target_debt.status = "Paid"
        title = f"Payment: {target_debt.name}"
        category = "Debt Payment"
    else:
        target_account.balance -= payment_data.amount
        if target_account.payment_due_day:
            target_account.due_date = get_next_due_date(
                payment_data.payment_date,
                target_account.payment_due_day
            )
        title = f"Payment: {target_account.name}"
        category = "Credit Card Payment"

    if target_debt is not None:
        target_debt.due_date = get_next_month_date(as_date(target_debt.due_date)).isoformat()

    payment = Payment(
        user_id=current_user.id,
        amount=payment_data.amount,
        payment_date=payment_data.payment_date,
        source_account_id=payment_data.source_account_id,
        debt_id=payment_data.debt_id,
        account_id=payment_data.account_id
    )
    transaction = Transaction(
        user_id=current_user.id,
        title=title,
        amount=payment_data.amount,
        type="expense",
        category=category,
        account_id=payment_data.source_account_id,
        transaction_date=payment_data.payment_date
    )

    db.add(payment)
    db.add(transaction)
    db.commit()
    db.refresh(payment)

    return payment, None


def get_payments(db: Session, current_user):
    return db.query(Payment).filter(Payment.user_id == current_user.id).order_by(Payment.payment_date.desc(), Payment.id.desc()).all()
