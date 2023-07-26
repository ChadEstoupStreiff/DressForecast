from typing import List, Dict

from db.drivers import DB


def create_user(user_mail: str, user_password: bytes, user_name: str, user_sex: str, user_country: str,
                user_city: str) -> bool:
    return DB().commit("""INSERT INTO Users
(user_mail, user_password, user_name, user_sex, user_country, user_city)
VALUES (%s,%s,%s,%s,%s,%s)""",
                       (user_mail, user_password, user_name, user_sex, user_country, user_city))


def get_user_password(email: str) -> bytes:
    return DB().execute_single("""SELECT user_password FROM Users WHERE user_mail=%s""", (email,))[0]


def get_users() -> List:
    return DB().execute("""SELECT user_mail, user_name, user_sex, user_country, user_city FROM Users""")


def get_user_info(user_mail: str) -> Dict[str, str]:
    data = DB().execute_single(
        """SELECT user_mail, user_name, user_sex, user_country, user_city FROM Users WHERE user_mail=%s""",
        (user_mail,))
    if data is not None:
        return {
            "mail": data[0],
            "name": data[1],
            "sex": data[2],
            "country": data[3],
            "city": data[4],
        }
    return {}
