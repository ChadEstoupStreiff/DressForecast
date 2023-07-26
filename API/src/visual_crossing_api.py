import urllib.request
import sys
import json

def get_weather_week():
    try: 
        ResultBytes = urllib.request.urlopen("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/paris?unitGroup=metric&key=YOUR_API_KEY&contentType=json")
        
        # Parse the results as JSON
        jsonData = json.load(ResultBytes)
            
    except urllib.error.HTTPError  as e:
        ErrorInfo= e.read().decode() 
        print('Error code: ', e.code, ErrorInfo)
        sys.exit()
    except  urllib.error.URLError as e:
        ErrorInfo= e.read().decode() 
        print('Error code: ', e.code,ErrorInfo)
        sys.exit()

    return jsonData



                
