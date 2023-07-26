import time
from typing import Union, Dict

import jwt
from dotenv import dotenv_values


def sign_jwt(user_id: str) -> str:
    payload = {
        "user_id": user_id,
        "expires": time.time() + 600
    }

    config = dotenv_values("/.env")
    token = jwt.encode(payload, config["JWT_SECRET"], algorithm=config["JWT_ALGORITHM"])

    return token


def decode_jwt(token: str) -> Union[Dict[str, str], None]:
    try:
        config = dotenv_values("/.env")
        decoded_token = jwt.decode(token, config["JWT_SECRET"], algorithms=[config["JWT_ALGORITHM"]])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return None
