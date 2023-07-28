import urllib.request
import sys
import json
from db.clothes import get_clothes
from db.users import get_user_info


def get_weather_week(user: str):
    try:
        user_info = get_user_info(user)
        result_bytes = urllib.request.urlopen(
            f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{user_info['city']}%20{user_info['country']}?unitGroup=metric&key=QFTXUNVHMMAJBHEWDHG7XERWX&contentType=json")

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

    
    for day in week.keys():
        the_day = week[day]
        clothes_by_day = get_clothes_by_day_depending_meteo(the_day, clothes)
        the_day["clothes"] = clothes_by_day


    return {
        "week": week
    }


def get_clothes_by_day_depending_meteo(meteo_day, all_clothes):
    temp = 3
    if(meteo_day["feelslike"] < 5):
        temp = 0
    elif(meteo_day["feelslike"] < 15):
        temp = 1
    elif(meteo_day["feelslike"] < 25):
        temp = 2

    rain = 2
    rainList = ["BIGRAIN", "SMALLRAIN", "NORAIN"]
    if(meteo_day["precipprob"] < 10):
        temp = 0
        rainList = ["NORAIN", "SMALLRAIN", "BIGRAIN"]

    elif(meteo_day["precipprob"] < 50):
        temp = 1
        rainList = ["SMALLRAIN", "BIGRAIN", "NORAIN"]

    day_clothes_list = []


    """{
      "name": "pantalon chad noir",
      "color": "noir",
      "c_type": "pantalon",
      "c_heat": "medium",
      "c_rain": "yes"
    }

    __TYPES = ["HAT", "TSHIRT", "PULL", "JACKET", "PANTS", "SHORT", "SKIRT", "SOCKS", "SHOES"]
    __HEAT = ["COLD", "MEDIUM", "HOT"]
    __RAIN = ["NORAIN", "SMALLRAIN", "BIGRAIN"]"""


    if(temp == 3): #+25°
        day_clothes_list.append(get_clothes_temp_rain(all_clothes, ["SHOES"], ["HOT", "MEDIUM", "COLD"], rainList))
        day_clothes_list.append(get_clothes_temp_rain(all_clothes, ["SHOES"], ["HOT", "MEDIUM", "COLD"], rainList))
        day_clothes_list.append(get_clothes_temp_rain(all_clothes, ["SKIRT","SHORT","PANTS"], ["HOT", "MEDIUM", "COLD"], rainList))
        day_clothes_list.append(get_clothes_temp_rain(all_clothes, ["TSHIRT"], ["HOT", "MEDIUM", "COLD"], rainList))
        day_clothes_list.append(get_clothes_temp_rain(all_clothes, ["HAT"], ["HOT"], rainList))
        if(rain>0):
            day_clothes_list.append(get_clothes_temp_rain(all_clothes, ["JACKET"], ["HOT", "MEDIUM", "COLD"], ["BIGRAIN"]))
        #chaussette+chaussures (HOT/MEDIUM//COLD)
        #short ou skirt (HOT/MEDIUM//COLD) si existe sinon pants (HOT/MEDIUM//COLD)
        #TSHIRT (HOT/MEDIUM//COLD)
        #hat (HOT)
    elif(temp == 2): #15~25°
        day_clothes_list.append(get_clothes_temp_rain(all_clothes, ["SHOES"], ["HOT", "MEDIUM", "COLD"], rainList))

        #chaussette+chaussures (MEDIUM/COLD//HOT)
        #pants (MEDIUM/COLD//HOT) si existe sinon short ou skirt (MEDIUM/COLD//HOT)
        #TSHIRT (MEDIUM/COLD//HOT) + PULL (HOT/MEDIUM//COLD)
        #hat (MEDIUM)
    elif(temp == 1): #5~15°
        day_clothes_list.append(get_clothes_temp_rain(all_clothes, ["SHOES"], ["HOT", "MEDIUM", "COLD"], rainList))
        #chaussette+chaussures (COLD/MEDIUM//HOT)
        #pants (COLD/MEDIUM//HOT) si existe sinon short ou skirt (COLD/MEDIUM//HOT)
        #TSHIRT (MEDIUM/COLD//HOT) + PULL (COLD/MEDIUM//HOT) + (MEDIUM/HOT//COLD)
        #hat (COLD)
    elif(temp == 0): #-5°
        day_clothes_list.append(get_clothes_temp_rain(all_clothes, ["SHOES"], ["HOT", "MEDIUM", "COLD"], rainList))
        #chaussette+chaussures (COLD/MEDIUM//HOT)
        #pants (COLD/MEDIUM//HOT) si existe sinon short ou skirt (COLD/MEDIUM//HOT)
        #TSHIRT (COLD/MEDIUM//HOT) + PULL (COLD/MEDIUM//HOT) + JACKET (COLD/MEDIUM//HOT)
        #hat (COLD)

    return day_clothes_list
    


def get_clothes_temp_rain(all_clothes, cat, temp_list, rain_list):
    clothe = 0
    cat_iter = 0
    while(cat_iter<len(cat) and clothe==0):
        temp_iter = 0
        while(temp_iter<len(temp_list) and clothe==0):
            rain_iter = 0
            while(rain_iter<len(rain_list) and clothe==0):
                for this_clothe in all_clothes:
                    #if (this_clothe.c_type == cat[cat_iter] and this_clothe.c_heat == temp_list[temp_iter] and this_clothe.c_rain == rain_list[rain_iter]):
                    if (this_clothe.c_type == cat[cat_iter] and this_clothe.c_heat == temp_list[temp_iter] and this_clothe.c_rain == rain_list[rain_iter]):
                        clothe = this_clothe
                        break
                rain_iter+=1
            temp_iter+=1
        cat_iter+=1

    return clothe