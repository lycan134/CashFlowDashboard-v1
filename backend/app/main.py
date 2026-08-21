import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base, migrate_database

from app.routes import account
from app.routes import transaction
from app.routes import debt
from app.routes import report
from app.routes import settings
from app.routes import payment
from app.routes import auth
from app.models.account import Account
from app.models.transaction import Transaction
from app.models.debt import Debt
from app.models.payment import Payment
from app.models.user import User


Base.metadata.create_all(
    bind=engine
)

migrate_database()


app = FastAPI(
    title="CashFlow API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    account.router
)

app.include_router(
    transaction.router
)

app.include_router(
    debt.router
)

app.include_router(
    report.router
)

app.include_router(
    settings.router
)

app.include_router(
    payment.router
)

app.include_router(
    auth.router
)

@app.get("/")
def home():

    return {
        "message": "CashFlow API running"
    }