from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simulated database for live data
data = {
    "waterFlow": [0, 0, 0, 0],
    "waterLevel": [0, 0],
    "pHLevel": 0.0
}

@app.route('/upload-data', methods=['POST'])
def upload_data():
    global data
    incoming_data = request.get_json()
    data["waterFlow"] = incoming_data.get("waterFlow", [0, 0, 0, 0])
    data["waterLevel"] = incoming_data.get("waterLevel", [0, 0])
    data["pHLevel"] = incoming_data.get("pHLevel", 0.0)
    return jsonify({"status": "success"}), 200

@app.route('/get-data', methods=['GET'])
def get_data():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
