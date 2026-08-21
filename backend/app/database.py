import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker, declarative_base


load_dotenv(Path(__file__).resolve().parents[1] / ".env")


DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgresql://",
        "postgresql+psycopg://"
    )


engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


Base = declarative_base()


def migrate_database():

    inspector = inspect(engine)
    tables = inspector.get_table_names()

    debt_columns = (
        {column["name"] for column in inspector.get_columns("debts")}
        if "debts" in tables else set()
    )

    account_columns = (
        {column["name"] for column in inspector.get_columns("accounts")}
        if "accounts" in tables else set()
    )

    transaction_columns = (
        {column["name"] for column in inspector.get_columns("transactions")}
        if "transactions" in tables else set()
    )

    payment_columns = (
        {column["name"] for column in inspector.get_columns("payments")}
        if "payments" in tables else set()
    )


    with engine.begin() as connection:

        if "debts" in tables and "original_amount" not in debt_columns:
            connection.execute(
                text(
                    "ALTER TABLE debts "
                    "ADD COLUMN original_amount FLOAT NOT NULL DEFAULT 0"
                )
            )

        if "debts" in tables and "remaining_amount" not in debt_columns:
            connection.execute(
                text(
                    "ALTER TABLE debts "
                    "ADD COLUMN remaining_amount FLOAT NOT NULL DEFAULT 0"
                )
            )

        if "debts" in tables and "monthly_payment" not in debt_columns:
            connection.execute(
                text(
                    "ALTER TABLE debts "
                    "ADD COLUMN monthly_payment FLOAT NOT NULL DEFAULT 0"
                )
            )


        if "accounts" in tables and "credit_limit" not in account_columns:
            connection.execute(
                text(
                    "ALTER TABLE accounts "
                    "ADD COLUMN credit_limit FLOAT"
                )
            )

        if "accounts" in tables and "due_date" not in account_columns:
            connection.execute(
                text(
                    "ALTER TABLE accounts "
                    "ADD COLUMN due_date DATE"
                )
            )

        if "accounts" in tables and "payment_due_day" not in account_columns:
            connection.execute(
                text(
                    "ALTER TABLE accounts "
                    "ADD COLUMN payment_due_day INTEGER"
                )
            )


        if "transactions" in tables and "transaction_date" not in transaction_columns:
            connection.execute(
                text(
                    "ALTER TABLE transactions "
                    "ADD COLUMN transaction_date DATE"
                )
            )


        if "accounts" in tables and "user_id" not in account_columns:
            connection.execute(
                text(
                    "ALTER TABLE accounts "
                    "ADD COLUMN user_id INTEGER REFERENCES users(id)"
                )
            )

        if "transactions" in tables and "user_id" not in transaction_columns:
            connection.execute(
                text(
                    "ALTER TABLE transactions "
                    "ADD COLUMN user_id INTEGER REFERENCES users(id)"
                )
            )

        if "debts" in tables and "user_id" not in debt_columns:
            connection.execute(
                text(
                    "ALTER TABLE debts "
                    "ADD COLUMN user_id INTEGER REFERENCES users(id)"
                )
            )

        if "payments" in tables and "user_id" not in payment_columns:
            connection.execute(
                text(
                    "ALTER TABLE payments "
                    "ADD COLUMN user_id INTEGER REFERENCES users(id)"
                )
            )


        if "debts" in tables:
            connection.execute(
                text(
                    "UPDATE debts "
                    "SET original_amount = amount "
                    "WHERE original_amount = 0 AND amount != 0"
                )
            )

            connection.execute(
                text(
                    "UPDATE debts "
                    "SET remaining_amount = amount - paid_amount "
                    "WHERE remaining_amount = 0 "
                    "AND amount != 0 "
                    "AND paid_amount < amount"
                )
            )

            connection.execute(
                text(
                    "UPDATE debts "
                    "SET status = 'Paid' "
                    "WHERE lower(status) = 'paid'"
                )
            )

            connection.execute(
                text(
                    "UPDATE debts "
                    "SET status = 'Active' "
                    "WHERE lower(status) = 'active'"
                )
            )


        if "accounts" in tables:
            connection.execute(
                text(
                    "UPDATE accounts "
                    "SET type = 'bank' "
                    "WHERE lower(type) = 'bank account'"
                )
            )

            connection.execute(
                text(
                    "UPDATE accounts "
                    "SET type = 'e_wallet' "
                    "WHERE lower(type) = 'e-wallet'"
                )
            )

            connection.execute(
                text(
                    "UPDATE accounts "
                    "SET type = 'cash' "
                    "WHERE lower(type) = 'cash'"
                )
            )


        if "transactions" in tables:
            connection.execute(
                text(
                    "UPDATE transactions "
                    "SET transaction_date = date(created_at) "
                    "WHERE transaction_date IS NULL"
                )
            )


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()