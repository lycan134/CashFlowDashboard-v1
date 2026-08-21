from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.crud import user
from app.database import get_db
from app.schemas.auth import Token
from app.schemas.user import UserCreate, UserResponse
from app.security import create_access_token, get_current_user, verify_password


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    if user.get_user_by_username(db, user_data.username) or user.get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=400, detail="Username or email already registered")
    return user.create_user(db, user_data)


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = user.get_user_by_username(db, form_data.username)
    if db_user is None or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    return {"access_token": create_access_token(db_user.id), "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
def read_current_user(current_user=Depends(get_current_user)):
    return current_user