from dataclasses import dataclass
from enum import Enum, auto
from typing import List, Dict, Any

from db.drivers import DB


class ClothesTypes(Enum):
    TSHIRT = auto()
    LEGGING = auto()


class ClothesHeat(Enum):
    VERYCOLD = auto()
    COLD = auto()
    MEDIUM = auto()
    HOT = auto()
    VERYHOT = auto()


class ClothesRain(Enum):
    BIGRAIN = auto()
    LITTLERAIN = auto()
    NORAIN = auto()


@dataclass
class Clothe:
    name: str
    color: str
    c_type: ClothesTypes
    c_heat: ClothesHeat
    c_rain: ClothesRain


def register_clothes(user: str, clothe: Clothe) -> bool:
    return DB().commit("""INSERT INTO Clothes
(user_mail, name, color, type, heat, rain)
VALUES (%s,%s,%s,%s,%s,%s)""",
                       (user, clothe.name, clothe.color, clothe.c_type, clothe.c_heat, clothe.c_rain))


def get_clothes(user: str) -> List[Dict[str, Any]]:
    return DB().execute("""SELECT name, color, type, heat, rain FROM Clothes WHERE user_mail=%s""", (user,),
                        ("name", "color", "type", "heat", "rain"))
