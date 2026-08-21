from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session


from app.database import get_db
from app.security import get_current_user

from app.crud import report



router = APIRouter(

    prefix="/reports",

    tags=["Reports"]

)



@router.get("/summary")
def summary(

    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)

):

    return report.get_summary(db, current_user)


@router.get("/categories")
def categories(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return report.get_categories(db, current_user)


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return report.get_dashboard(db, current_user)