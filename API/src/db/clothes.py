from dataclasses import dataclass
from typing import List

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


def register_clothes(user: str, clothe: Clothe) -> bool:
    if clothe.c_type in __TYPES and clothe.c_heat in __HEAT and clothe.c_rain in __RAIN:
        return DB().commit("""INSERT INTO Clothes
                            (user_mail, name, color, type, heat, rain)
                            VALUES (%s,%s,%s,%s,%s,%s)""",
                           (user, clothe.name, clothe.color, clothe.c_type, clothe.c_heat, clothe.c_rain))
    return False


def get_clothes(user: str) -> List[Clothe]:
    return [Clothe(c[0], c[1], c[2], c[3], c[4]) for c in
            DB().execute("""SELECT name, color, type, heat, rain FROM Clothes WHERE user_mail=%s""", (user,))]
