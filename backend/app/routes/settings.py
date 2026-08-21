# app/routes/settings.py


from fastapi import APIRouter, Depends

from app.schemas.settings import (
    SettingsResponse,
    SettingsUpdate
)

from app.crud import settings
from app.security import get_current_user



router = APIRouter(

    prefix="/settings",

    tags=["Settings"]

)



@router.get(
    "/",
    response_model=SettingsResponse
)
def get_settings(current_user = Depends(get_current_user)):


    return settings.get_settings()





@router.put(
    "/",
    response_model=SettingsResponse
)
def update_settings(
    settings_data: SettingsUpdate,
    current_user = Depends(get_current_user)
):


    return settings.update_settings(
        settings_data
    )