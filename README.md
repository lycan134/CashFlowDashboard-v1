# CashFlow Dashboard

A modern full-stack personal finance management application built with **React**, **FastAPI**, **SQLAlchemy**, and **PostgreSQL**.

The application helps users manage their finances by tracking accounts, transactions, debts, credit cards, Buy Now Pay Later (BNPL) accounts, and financial reports in one centralized dashboard.

---

## 📸 Preview

> Add screenshots here after deployment.

| Dashboard | Accounts |
|-----------|----------|
| ![](docs/dashboard.png) | ![](docs/accounts.png) |

---

# Features

### Dashboard

- Financial summary cards
- Cash Available
- Total Income
- Total Expenses
- Outstanding Debt
- Recent Transactions
- Cash Flow visualization
- Account Overview

---

### Accounts

- Create accounts
- Edit accounts
- Delete accounts
- Bank accounts
- Cash
- E-wallets
- Credit Cards
- Buy Now Pay Later (BNPL)

---

### Transactions

- Create transactions
- Edit transactions
- Delete transactions
- Income
- Expense
- Category dropdown
- Date tracking
- Linked to accounts
- Automatic account balance updates

---

### Debts

- Create debts
- Edit debts
- Delete debts
- Monthly payment amount
- Due dates
- Payment button
- Automatically reduces remaining balance
- Automatically moves next due date forward every month

---

### Credit Cards

- Due date tracking
- Payment button
- Choose which account will pay the credit card
- Automatic balance deduction
- Automatic monthly due date update

---

### Reports

- Income summary
- Expense summary
- Cash flow summary
- Debt overview

---

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

---

# Tech Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Lucide React

## Backend

- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Pydantic
- JWT Authentication

---

# Project Structure

```
cashflow-dashboard/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── auth/
│
├── backend/
│   ├── app/
│   │   ├── crud/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── database.py
│   │
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/lycan134/CashFlowDashboard-v1.git
cd CashFlowDashboard-v1
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

Swagger API

```
http://127.0.0.1:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# ⚙ Environment Variables

Backend

```
DATABASE_URL=postgresql+psycopg://postgres:password@localhost:5432/cashflow

SECRET_KEY=your_secret_key

ACCESS_TOKEN_EXPIRE_MINUTES=60

CORS_ORIGINS=http://localhost:5173
```

---

# Future Improvements

- Mobile application (React Native)
- Recurring transactions
- Budget planner
- Savings goals
- Notifications
- Data export (Excel/PDF)
- Dark mode improvements
- Charts and analytics
- Cloud deployment
- Multi-currency support

---

# Learning Objectives

This project was built to improve my understanding of

- Full-stack web development
- REST API design
- SQLAlchemy ORM
- Authentication with JWT
- React state management
- CRUD operations
- PostgreSQL
- API integration
- Financial application architecture

---

# License

MIT License

---

## Author

**Virginio Torlao**

Physics Researcher • Aspiring Full-Stack Web Developer

GitHub:
https://github.com/lycan134
