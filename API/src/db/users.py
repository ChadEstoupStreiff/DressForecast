from typing import List, Dict, Union

from db.drivers import DB
from visual_crossing_api import get_weather_week

def create_user(user_mail: str, user_password: bytes, user_name: str, user_sex: str, user_country: str,
                user_city: str) -> bool:
    if get_weather_week(user_mail) is not None:
        return DB().commit("""INSERT INTO Users
    (user_mail, user_password, user_name, user_sex, user_country, user_city)
    VALUES (%s,%s,%s,%s,%s,%s)""",
                           (user_mail, user_password, user_name, user_sex, user_country, user_city))
    return None

def get_user_password(email: str) -> Union[bytes, None]:
    data = DB().execute_single("""SELECT user_password FROM Users WHERE user_mail=%s""", (email,))
    if data is not None:
        return data[0]
    return None


def get_users() -> List:
    return DB().execute("""SELECT user_mail, user_name, user_sex, user_country, user_city FROM Users""",
                        keys=("mail", "name", "sex", "country", "city"))


def get_user_info(user_mail: str) -> Dict[str, str]:
    data = DB().execute_single(
        """SELECT user_mail, user_name, user_sex, user_country, user_city FROM Users WHERE user_mail=%s""",
        (user_mail,), ("mail", "name", "sex", "country", "city"))
    return data
