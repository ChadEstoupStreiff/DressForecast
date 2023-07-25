import bcrypt
from auth.auth_handler import signJWT
from db.users import get_users, create_user
from dotenv import dotenv_values


def get_token(mail: str):
    return signJWT(mail)


def register_user(user_mail: str, user_password: str, user_name: str, user_sex: str, user_country: str, user_city: str):
    config = dotenv_values("/app/.env")
    user_password = bcrypt.hashpw(user_password.encode(), bcrypt.gensalt(rounds=int(config["SALT_LENGTH"])))
    if create_user(user_mail, user_password, user_name, user_sex, user_country, user_city):
        return get_token(user_mail)
    return None


def check_user(user_mail: str, user_password: str):
    users = get_users()
    if users is not None:
        for user in users:
            if user[0] == user_mail and bcrypt.checkpw(user_password.encode(), bytes(user[1])):
                return True
    return False
