from sqlalchemy.orm import Session

from app.models.debt import Debt

from app.schemas.debt import (
    DebtCreate,
    DebtUpdate
)



def create_debt(
    db: Session,
    debt_data: DebtCreate,
    current_user
):

    new_debt = Debt(
        user_id=current_user.id,

        name=debt_data.name,

        amount=debt_data.original_amount,

        original_amount=debt_data.original_amount,

        remaining_amount=max(debt_data.original_amount - debt_data.paid_amount, 0),

        paid_amount=debt_data.paid_amount,

        monthly_payment=debt_data.monthly_payment,

        due_date=debt_data.due_date,

        status="Paid" if debt_data.status.lower() == "paid" else "Active"

    )


    db.add(new_debt)

    db.commit()

    db.refresh(new_debt)


    return new_debt





def get_debts(
    db: Session,
    current_user
):

    return db.query(Debt).filter(Debt.user_id == current_user.id).all()





def get_debt(
    db: Session,
    debt_id:int,
    current_user
):

    return (
        db.query(Debt)
        .filter(Debt.id == debt_id, Debt.user_id == current_user.id)
        .first()
    )





def update_debt(
    db: Session,
    debt_id:int,
    debt_data:DebtUpdate,
    current_user
):

    debt = get_debt(
        db,
        debt_id,
        current_user
    )


    if debt is None:
        return None


    debt.name = debt_data.name
    debt.amount = debt_data.original_amount
    debt.original_amount = debt_data.original_amount
    debt.remaining_amount = debt_data.remaining_amount
    debt.paid_amount = debt_data.paid_amount
    debt.monthly_payment = debt_data.monthly_payment
    debt.due_date = debt_data.due_date
    debt.status = "Paid" if debt_data.status.lower() == "paid" else "Active"


    db.commit()

    db.refresh(debt)


    return debt





def delete_debt(
    db:Session,
    debt_id:int,
    current_user
):

    debt = get_debt(
        db,
        debt_id,
        current_user
    )


    if debt is None:
        return None


    db.delete(debt)

    db.commit()


    return debt


def pay_debt(
    db: Session,
    debt_id: int,
    current_user
):

    debt = get_debt(db, debt_id, current_user)

    if debt is None:
        return None

    payment = min(debt.monthly_payment, debt.remaining_amount)
    debt.remaining_amount -= payment
    debt.paid_amount += payment

    if debt.remaining_amount <= 0:
        debt.remaining_amount = 0
        debt.status = "Paid"

    db.commit()
    db.refresh(debt)

    return debt