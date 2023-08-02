from typing import List, Dict, Union

from fastapi import HTTPException

from db.drivers import DB


def delete_user(user_mail: str) -> bool:
    data = DB().commit("""DELETE FROM Users
WHERE user_mail=%s""",
                       (user_mail,))
    if data is not None:
        return data
    raise HTTPException(400, "Can't delete user")


def update_user(old_user_mail: str, user_mail: str = None, user_password: bytes = None, user_name: str = None,
                user_sex: str = None,
                user_country: str = None,
                user_city: str = None) -> bool:
    if user_password is not None:
        if not DB().commit("""UPDATE Users
SET user_password=%s WHERE user_mail=%s""",
                           (user_password, old_user_mail)):
            raise HTTPException(400, "Can't update user")

    if user_name is not None:
        if not DB().commit("""UPDATE Users
SET user_name=%s WHERE user_mail=%s""",
                           (user_name, old_user_mail)):
            raise HTTPException(400, "Can't update user")

    if user_sex is not None:
        if not DB().commit("""UPDATE Users
SET user_sex=%s WHERE user_mail=%s""",
                           (user_sex, old_user_mail)):
            raise HTTPException(400, "Can't update user")

    if user_country is not None:
        if not DB().commit("""UPDATE Users
SET user_country=%s WHERE user_mail=%s""",
                           (user_country, old_user_mail)):
            raise HTTPException(400, "Can't update user")

    if user_city is not None:
        if not DB().commit("""UPDATE Users
SET user_city=%s WHERE user_mail=%s""",
                           (user_city, old_user_mail)):
            raise HTTPException(400, "Can't update user")

    if user_mail is not None:
        if not DB().commit("""UPDATE Users
SET user_password=%s WHERE user_mail=%s""",
                           (user_mail, old_user_mail)):
            raise HTTPException(400, "Can't update user")

    return True


def create_user(user_mail: str, user_password: bytes, user_name: str, user_sex: str, user_country: str,
                user_city: str) -> bool:
    data = DB().commit("""INSERT INTO Users
(user_mail, user_password, user_name, user_sex, user_country, user_city)
VALUES (%s,%s,%s,%s,%s,%s)""",
                       (user_mail, user_password, user_name, user_sex, user_country, user_city))
    if data is not None:
        return data
    raise HTTPException(400, "Invalid variables")


def get_user_password(email: str) -> Union[bytes, None]:
    data = DB().execute_single("""SELECT user_password FROM Users WHERE user_mail=%s""", (email,))
    if data is not None:
        return data[0]
    raise HTTPException(400, "Invalid credentials")


def get_users() -> Union[List, None]:
    return DB().execute("""SELECT user_mail, user_name, user_sex, user_country, user_city FROM Users""",
                        keys=("mail", "name", "sex", "country", "city"))


def get_user_info(user_mail: str) -> Dict[str, str]:
    data = DB().execute_single(
        """SELECT user_mail, user_name, user_sex, user_country, user_city FROM Users WHERE user_mail=%s""",
        (user_mail,), ("mail", "name", "sex", "country", "city"))
    return data
