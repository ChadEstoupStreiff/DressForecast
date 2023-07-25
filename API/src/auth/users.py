from pydantic import BaseModel, Field, EmailStr
from auth.auth_handler import signJWT
from db.users import get_users, create_user

def get_token(mail: str):
    return signJWT(mail)


def register_user(user_mail: str, user_password: str, user_name: str, user_sex: str, user_country: str, user_city: str):
    if create_user(user_mail, user_password, user_name, user_sex, user_country, user_city):
        return get_token(user_mail)
    return None


def check_user(email: str, password: str):
    for user in get_users():
        if user.email == email and user.password == password:
            return True
        return False
