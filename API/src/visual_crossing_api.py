import json
import urllib.request

import sys

from db.clothes import get_clothes
from db.users import get_user_info


def get_weather_week(user: str = None, city: str = None, country: str = None):
    try:
        if user is not None:
            user_info = get_user_info(user)
            city = user_info['city']
            country = user_info['country']
        result_bytes = urllib.request.urlopen(
            f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{city}%20{country}?unitGroup=metric&key=QFTXUNVHMMAJBHEWDHG7XERWX&contentType=json")

        # Parse the results as JSON
        json_data = json.load(result_bytes)
        # return json_data

        weather_datas = {}

        for i in range(7):
            current_day_datas = json_data["days"][i]
            weather_datas[current_day_datas["datetime"]] = {"feelslike": current_day_datas["feelslike"],
                                                            "conditions": current_day_datas["conditions"],
                                                            "precipprob": current_day_datas["precipprob"]
                                                            }

        return weather_datas

    except urllib.error.HTTPError as e:
        ErrorInfo = e.read().decode()
        print('Error code: ', e.code, ErrorInfo)
        sys.exit()
        return "Error occured"

    except  urllib.error.URLError as e:
        ErrorInfo = e.read().decode()
        print('Error code: ', e.code, ErrorInfo)
        sys.exit()
        return "Error occured"


def get_clothes_for_week(user):
    clothes = get_clothes(user)
    week = get_weather_week(user)

    return {
        "clothes": clothes,
        "week": week
    }
