import time
from typing import Dict

import jwt
from dotenv import dotenv_values


def sign_jwt(user_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "expires": time.time() + 600
    }

    config = dotenv_values("/.env")
    token = jwt.encode(payload, config["JWT_SECRET"], algorithm=config["JWT_ALGORITHM"])

    return {
        "access_token": token
    }


def decode_jwt(token: str) -> dict:
    try:
        config = dotenv_values("/.env")
        decoded_token = jwt.decode(token, config["JWT_SECRET"], algorithms=[config["JWT_ALGORITHM"]])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return {}
