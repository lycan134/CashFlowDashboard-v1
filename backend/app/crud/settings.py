# app/crud/settings.py


settings_data = {

    "currency": "PHP",

    "theme": "light",

    "notifications": True

}



def get_settings():

    return settings_data



def update_settings(
    new_settings
):

    settings_data.update(

        new_settings.model_dump()

    )


    return settings_data