from db.drivers import DB
from typing import List


def create_user(user_mail: str, user_password: str, user_name: str, user_sex: str, user_country: str,
                user_city: str) -> bool:
    query = """INSERT INTO Users
                    (user_mail, user_password, user_name, user_sex, user_country, user_city)
                    VALUES (%s,%s,%s,%s,%s,%s)"""
    values = (user_mail, user_password, user_name, user_sex, user_country, user_city)

    cursor = DB().get_cursor()
    cursor.execute(query, values)
    DB().commit(cursor)
    return True


def get_users() -> List:
    return []
