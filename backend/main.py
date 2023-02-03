from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from flask import jsonify


app = Flask(__name__)
CORS(app)


client = MongoClient(
    "mongodb+srv://maira_bloomx:1234maira@cluster0.tjfzwve.mongodb.net/?retryWrites=true&w=majority")
db = client.gettingStarted
locations_collection = db.locations


# location is each row that I am insering and locations_collection is my ''table''


@app.route("/")
def hello_world():
    print(location)
    # locations_collection.insert_one(location)
    return jsonify(location)


@app.route('/locations', methods=['GET'])
def get_data():
    cursor = locations_collection.find({}, {'_id': 0})

    locations = [x for x in cursor]
    print(locations)

    # location = [
    #     {'name': "maira home",
    #      'lat': 32.08818844604488,
    #      'lon': 34.83330233555725
    #      },
    #     {'name': "ido home",
    #      'lat': 32.8191218,
    #      'lon': 34.9983856
    #      }
    # ]
    return jsonify(locations)
