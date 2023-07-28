from typing import Union, Dict

import bcrypt
from dotenv import dotenv_values
from fastapi import HTTPException

from auth.auth_handler import decode_jwt
from auth.auth_handler import sign_jwt
from db.users import get_user_password, create_user


def get_token(mail: str) -> str:
    return sign_jwt(mail)


def is_mail(mail: str) -> bool:
    splitted: list = mail.split('@')
    if len(splitted) == 2 and len(splitted[0]) > 0 and len(splitted[1]) > 2:
        splitted_domain: list = splitted[1].split('.')
        return len(splitted_domain) == 2 and len(splitted_domain[0]) > 0 and len(splitted_domain[1]) > 2
    return False


def register_user(user_mail: str, user_password: str, user_name: str, user_sex: str, user_country: str,
                  user_city: str) -> str:
    if is_mail(user_mail):
        config = dotenv_values("/.env")
        user_password = bcrypt.hashpw(user_password.encode(), bcrypt.gensalt(rounds=int(config["SALT_LENGTH"])))
        if create_user(user_mail, user_password, user_name, user_sex, user_country, user_city):
            return get_token(user_mail)
    else:
        raise HTTPException(400, detail=f"{user_mail} is not a mail")


def check_user(user_mail: str, user_password: str) -> bool:
    user_encrypted_password = get_user_password(user_mail)
    return user_encrypted_password is not None and bcrypt.checkpw(user_password.encode(),
                                                                  bytes(user_encrypted_password))


def get_user_login_info(token: str) -> Dict[str, str]:
    return decode_jwt(token)


def get_user_id(token: str) -> str:
    return get_user_login_info(token)["user_id"]
