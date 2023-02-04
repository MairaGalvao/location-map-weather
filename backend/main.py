from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from flask import jsonify
import requests

app = Flask(__name__)
CORS(app)


client = MongoClient(
    "mongodb+srv://maira_bloomx:1234maira@cluster0.tjfzwve.mongodb.net/?retryWrites=true&w=majority")
db = client.gettingStarted
locations_collection = db.locations

# print(locations_collection, 'my location collection')
weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=32.2025693&lon=34.8279716&appid=38cb4c5f06b6256a8dc99b7c4f5976fd'


@app.route('/locations', methods=['GET'])
def get_data():
    cursor = locations_collection.find({}, {'_id': 0})
    weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=32.2025693&lon=34.8279716&appid=38cb4c5f06b6256a8dc99b7c4f5976fd'
    updatedData = []
    for obj in cursor:
        eachLon = obj['lon']
        eachLat = obj['lat']
        weatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid=38cb4c5f06b6256a8dc99b7c4f5976fd".format(
            eachLat, eachLon)
        response = requests.get(weatherAPI)
        data = response.json()
        temperature = data['main']['temp']
        obj["temp"] = temperature
        updatedData.append(obj)
    return updatedData
    print(updatedData, 'updatedData OUTSIDE FUNCTION')

# stuff_in_string = "https://api.openweathermap.org/data/2.5/weather?lat={}&lon=34.8279716&appid=38cb4c5f06b6256a8dc99b7c4f5976fd".format(eachLon)


# todo get the weather from the real location added on the data

#   response = requests.get(weatherAPI)
#    # print(response, 'my data response from weather')
#    if response.status_code == 200:
#         data = response.json()
#         temperature = data['main']['temp']
#         print(temperature, 'my temperature')

#     return jsonify(locations)
