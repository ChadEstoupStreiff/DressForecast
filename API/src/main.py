from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

from fastapi import FastAPI, Body

from auth.users import register_user, check_user, get_token

from fastapi import FastAPI, Body, Depends
from auth.auth_bearer import JWTBearer
from db.drivers import DB

DB()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# User


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


# Clothes


@app.get("/clothes", dependencies=[Depends(JWTBearer())], tags=["clothes"])
async def list_clothes() -> dict:
    return {
        "data": "in dev"
    }


@app.post("/clothes/register", dependencies=[Depends(JWTBearer())], tags=["clothes"])
async def add_clother() -> dict:
    return {
        "data": "in dev"
    }
