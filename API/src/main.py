from typing import List, Dict, Any

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from auth.auth_bearer import JWTBearer
from auth.users import register_user, check_user, get_token, get_user_id, get_user_login_info
from db.clothes import register_clothes, get_clothes, Clothe, ClothesTypes, ClothesHeat, ClothesRain
from db.users import get_user_info
from visual_crossing_api import get_weather_week

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# AUTH


@app.post("/user/signup", tags=["user"])
async def create_user(user_mail: str, user_password: str, user_name: str, user_sex: str, user_country: str,
                      user_city: str):
    return register_user(user_mail, user_password, user_name, user_sex, user_country, user_city)


@app.post("/user/login", tags=["user"])
async def user_login(user_mail: str, user_password: str):
    if check_user(user_mail, user_password):
        return get_token(user_mail)
    return {
        "error": "Wrong login details!"
    }


@app.get("/user/login_info", tags=["user"])
async def user_login_info(token: str = Depends(JWTBearer())):
    return get_user_login_info(token)


# user

@app.get("/user/info", tags=["user"])
async def user_login_info(token: str = Depends(JWTBearer())):
    return get_user_info(get_user_id(token))


# Clothes


@app.get("/clothes", tags=["clothes"])
async def list_clothes(token: str = Depends(JWTBearer())) -> List[Dict[str, Any]]:
    return get_clothes(get_user_id(token))


@app.post("/clothes/register", tags=["clothes"])
async def add_clothe(name: str, color: str, c_type: str, c_heat: str, c_rain: str,
                     token: str = Depends(JWTBearer())) -> bool:
    try:
        clothe = Clothe(
            name,
            color,
            ClothesTypes[c_type],
            ClothesHeat[c_heat],
            ClothesRain[c_rain],
        )
        return register_clothes(get_user_id(token), clothe)
    except:
        return False


# Weather

@app.get("/weather/week", tags=["weather"])
async def get_week_weather() -> List:
    return get_weather_week()
