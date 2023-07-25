import bcrypt
from auth.auth_handler import sign_jwt
from db.users import get_user_password, create_user
from dotenv import dotenv_values


def get_token(mail: str):
    return sign_jwt(mail)


def is_mail(mail: str):
    splitted = mail.split('@')
    if len(splitted) == 2 and len(splitted[0]) > 0 and len(splitted[1]) > 2:
        splitted_domain = splitted[1].split('.')
        return len(splitted_domain) == 2 and len(splitted_domain[0]) > 0 and len(splitted_domain[1]) > 2
    return False


def register_user(user_mail: str, user_password: str, user_name: str, user_sex: str, user_country: str, user_city: str):
    if is_mail(user_mail):
        config = dotenv_values("/.env")
        user_password = bcrypt.hashpw(user_password.encode(), bcrypt.gensalt(rounds=int(config["SALT_LENGTH"])))
        if create_user(user_mail, user_password, user_name, user_sex, user_country, user_city):
            return get_token(user_mail)
    return None


def check_user(user_mail: str, user_password: str):
    user_encrypted_password = get_user_password(user_mail)
    return user_encrypted_password is not None and bcrypt.checkpw(user_password.encode(),
                                                                  bytes(user_encrypted_password))
