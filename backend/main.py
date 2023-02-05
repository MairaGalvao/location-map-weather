from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from flask import request
import requests
import json
app = Flask(__name__)
CORS(app)


client = MongoClient(
    "mongodb+srv://maira_bloomx:1234maira@cluster0.tjfzwve.mongodb.net/?retryWrites=true&w=majority")
db = client.gettingStarted
locations_collection = db.locations

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
        try:
            temperature = data['main']['temp']
            humidity = data['main']['humidity']
            city = data['name']
            obj["temp"] = temperature
            obj["humid"] = humidity
            obj["name"] = city

        except Exception as e:
            print("can't get weather for", data)
        updatedData.append(obj)
    return updatedData


@app.route('/locations', methods=['POST'])
def insert_attractions():
    print(request)
    print(request.data)
    attractionsData = request.data
    attractionsJson = json.loads(attractionsData)
    locations_collection.insert_one(attractionsJson)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}



