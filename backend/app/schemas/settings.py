# app/schemas/settings.py

from pydantic import BaseModel


class SettingsResponse(BaseModel):

    currency: str

    theme: str

    notifications: bool



class SettingsUpdate(BaseModel):

    currency: str

    theme: str

    notifications: bool