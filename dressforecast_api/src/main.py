from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

from fastapi import FastAPI, Body

from auth.users import UserSchema, UserLoginSchema, register_user, check_user, get_token

from fastapi import FastAPI, Body, Depends
from auth.auth_bearer import JWTBearer
from auth.auth_handler import signJWT

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
async def create_user(user: UserSchema = Body(...)):
    return register_user(user)


@app.post("/user/login", tags=["user"])
async def user_login(user: UserLoginSchema = Body(...)):
    if check_user(user):
        return get_token(user.email)
    return {
        "error": "Wrong login details!"
    }


# Clothes


@app.post("/clothes", dependencies=[Depends(JWTBearer())], tags=["clothes"])
async def list_clothes() -> dict:
    return {
        "data": "in dev"
    }


@app.post("/clothes/register", dependencies=[Depends(JWTBearer())], tags=["clothes"])
async def add_clother() -> dict:
    return {
        "data": "in dev"
    }
