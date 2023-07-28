from typing import List, Union, Dict, Any

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from auth.auth_bearer import JWTBearer
from auth.users import register_user, check_user, get_token, get_user_id, get_user_login_info
from db.clothes import register_clothes, get_clothes, Clothe
from db.users import get_user_info
from visual_crossing_api import get_weather_week, get_clothes_for_week

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
    if get_weather_week(city=user_city, country=user_country) is not None:
        return register_user(user_mail, user_password, user_name, user_sex, user_country, user_city)
    raise HTTPException(500, detail="Can't create user")


@app.post("/user/login", tags=["user"])
async def user_login(user_mail: str, user_password: str) -> Union[str, None]:
    if check_user(user_mail, user_password):
        return get_token(user_mail)
    return None


@app.get("/user/login_info", tags=["user"])
async def user_login_info(token: str = Depends(JWTBearer())) -> Union[Dict[str, Any], None]:
    return get_user_login_info(token)


# user

@app.get("/user/info", tags=["user"])
async def user_login_info(token: str = Depends(JWTBearer())) -> Union[Dict[str, Any], None]:
    return get_user_info(get_user_id(token))


# Clothes


@app.get("/clothes", tags=["clothes"])
async def list_clothes(token: str = Depends(JWTBearer())) -> List[Clothe]:
    return get_clothes(get_user_id(token))


@app.post("/clothes/register", tags=["clothes"])
async def add_clothe(name: str, color: str, c_type: str, c_heat: str, c_rain: str,
                     token: str = Depends(JWTBearer())) -> bool:
    try:
        clothe = Clothe(
            name,
            color,
            c_type,
            c_heat,
            c_rain,
        )
        return register_clothes(get_user_id(token), clothe)
    except:
        return False


@app.get("/clothes/week", tags=["weather", "clothes"])
async def clothes_for_week(token: str = Depends(JWTBearer())):
    return get_clothes_for_week(get_user_id(token))


# Weather

@app.get("/weather/week", tags=["weather"])
async def get_week_weather(token: str = Depends(JWTBearer())) -> Union[Dict[str, Any], None]:
    return get_weather_week(get_user_id(token))
