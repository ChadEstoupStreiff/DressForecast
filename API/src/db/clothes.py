from dataclasses import dataclass
from enum import Enum, auto
from typing import List


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
    return False


def get_clothes(user: str) -> List[Clothe]:
    return []
