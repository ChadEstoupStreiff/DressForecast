import urllib.request
import sys
import json
from db.clothes import get_clothes


def get_weather_week():
    try:
        result_bytes = urllib.request.urlopen(
            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/paris?unitGroup=metric&key=QFTXUNVHMMAJBHEWDHG7XERWX&contentType=json")

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


def get_clothes_for_week(mail):
    clothes = get_clothes(mail)
    week = get_weather_week()

    return {
        "clothes": clothes,
        "week": week
    }
