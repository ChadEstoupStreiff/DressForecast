from dataclasses import dataclass
from typing import List

from fastapi import HTTPException

from db.drivers import DB


@dataclass
class Clothe:
    name: str
    color: str
    c_type: str
    c_heat: str
    c_rain: str


__TYPES = ["HAT", "TSHIRT", "PULL", "JACKET", "PANTS", "SHORT", "SKIRT", "SOCKS", "SHOES"]
__HEAT = ["COLD", "MEDIUM", "HOT"]
__RAIN = ["NORAIN", "SMALLRAIN", "BIGRAIN"]


def delete_clothe(user: str, clothe: Clothe):
    data = DB().commit(
        """DELETE FROM Clothes
        WHERE user_mail=%s AND name=%s AND color=%s AND type=%s AND heat=%s AND rain=%s""",
        (user, clothe.name, clothe.color, clothe.c_type, clothe.c_heat, clothe.c_rain))
    if data:
        return data
    raise HTTPException(500, "Can't delete clothe")


def update_clothe(user: str, old_clothe: Clothe, new_clothe: Clothe):
    if new_clothe.c_type in __TYPES and new_clothe.c_heat in __HEAT and new_clothe.c_rain in __RAIN:
        data = DB().commit(
            """UPDATE Clothes SET
            name=%s,
            color=%s,
            type=%s,
            heat=%s,
            rain=%s
            WHERE user_mail=%s AND name=%s AND color=%s AND type=%s AND heat=%s AND rain=%s""",
            (new_clothe.name, new_clothe.color, new_clothe.c_type, new_clothe.c_heat, new_clothe.c_rain, user,
             old_clothe.name, old_clothe.color, old_clothe.c_type, old_clothe.c_heat, old_clothe.c_rain))
        if data:
            return data
        raise HTTPException(500, "Can't update clothe")
    raise HTTPException(400, "Invalid variables")


def register_clothes(user: str, clothe: Clothe) -> bool:
    if clothe.c_type in __TYPES and clothe.c_heat in __HEAT and clothe.c_rain in __RAIN:
        data = DB().commit("""INSERT INTO Clothes
                        (user_mail, name, color, type, heat, rain)
                        VALUES (%s,%s,%s,%s,%s,%s)""",
                           (user, clothe.name, clothe.color, clothe.c_type, clothe.c_heat, clothe.c_rain))
        if data:
            return data
        raise HTTPException(500, "Can't save clothe")
    raise HTTPException(400, "Invalid variables")


def get_clothes(user: str) -> List[Clothe]:
    data = DB().execute("""SELECT name, color, type, heat, rain FROM Clothes WHERE user_mail=%s""", (user,))

    if data is not None:
        return [Clothe(c[0], c[1], c[2], c[3], c[4]) for c in data]
    raise HTTPException(500, "Can't load clothe")
