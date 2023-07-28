from typing import List, Union, Dict, Any

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from auth.auth_bearer import JWTBearer
from auth.users import register_user, check_user, get_token, get_user_id, get_user_login_info, encrypt
from db.clothes import register_clothes, get_clothes, delete_clothe, update_clothe, Clothe
from db.users import get_user_info, delete_user, update_user
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
@app.get("/auth", tags=["user"])
async def endpoint_user_login_info(token: str = Depends(JWTBearer())) -> Union[Dict[str, Any], None]:
    return get_user_login_info(token)


@app.post("/auth", tags=["user"])
async def endpoint_user_login(user_mail: str, user_password: str) -> Union[str, None]:
    if check_user(user_mail, user_password):
        return get_token(user_mail)
    return None


# user


@app.get("/user", tags=["user"])
async def endpoint_user_login_info(token: str = Depends(JWTBearer())) -> Union[Dict[str, Any], None]:
    return get_user_info(get_user_id(token))


@app.post("/user", tags=["user"])
async def endpoint_create_user(user_mail: str, user_password: str, user_name: str, user_sex: str, user_country: str,
                               user_city: str):
    if get_weather_week(city=user_city, country=user_country) is not None:
        return register_user(user_mail, user_password, user_name, user_sex, user_country, user_city)
    raise HTTPException(500, detail="Can't create user")


@app.put("/user", tags=["user"])
async def endpoint_update_user(user_mail: str = None, user_password: str = None, user_name: str = None,
                               user_sex: str = None, user_country: str = None,
                               user_city: str = None, token: str = Depends(JWTBearer())):
    if user_password is not None:
        user_password = encrypt(user_password)
    old_user_mail = get_user_id(token)
    if old_user_mail == user_mail:
        return update_user(old_user_mail, user_mail, user_password, user_name, user_sex, user_country, user_city)
    raise HTTPException(500, detail="Can't create user")


@app.delete("/user", tags=["user"])
async def endpoint_delete_user(token: str = Depends(JWTBearer())):
    return delete_user(get_user_id(token))


# Clothes


@app.get("/clothes", tags=["clothes"])
async def endpoint_list_clothes(token: str = Depends(JWTBearer())) -> List[Clothe]:
    return get_clothes(get_user_id(token))


@app.post("/clothes", tags=["clothes"])
async def endpoint_add_clothe(name: str, color: str, c_type: str, c_heat: str, c_rain: str,
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


@app.put("/clothes", tags=["clothes"])
async def endpoint_update_clothe(old_name: str, old_color: str, old_c_type: str, old_c_heat: str, old_rain: str,
                                 new_name: str, new_color: str, new_c_type: str, new_c_heat: str, new_rain: str,
                                 token: str = Depends(JWTBearer())) -> bool:
    try:
        old_clothe = Clothe(
            old_name,
            old_color,
            old_c_type,
            old_c_heat,
            old_rain,
        )
        new_clothe = Clothe(
            new_name,
            new_color,
            new_c_type,
            new_c_heat,
            new_rain,
        )
        return update_clothe(get_user_id(token), old_clothe, new_clothe)
    except:
        return False


@app.delete("/clothes", tags=["clothes"])
async def endpoint_delete_clothe(name: str, color: str, c_type: str, c_heat: str, c_rain: str,
                                 token: str = Depends(JWTBearer())) -> bool:
    try:
        clothe = Clothe(
            name,
            color,
            c_type,
            c_heat,
            c_rain,
        )
        return delete_clothe(get_user_id(token), clothe)
    except:
        return False


@app.get("/clothes/week", tags=["clothes"])
async def endpoint_clothes_for_week(token: str = Depends(JWTBearer())):
    return get_clothes_for_week(get_user_id(token))


# Weather

@app.get("/weather", tags=["weather"])
async def endpoint_get_week_weather(token: str = Depends(JWTBearer())) -> Union[Dict[str, Any], None]:
    return get_weather_week(get_user_id(token))
