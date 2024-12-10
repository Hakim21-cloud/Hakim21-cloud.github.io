from flask import Flask, request, jsonify, render_template
import random

app = Flask(__name__)

# Simulated sensor data (to replace with live Arduino data)
sensor_data = {
    "waterFlowSensors": [0, 0, 0, 0],  # Flow rate for 4 sensors (liters/min)
    "waterLevelSensors": [0, 0],       # Water levels as percentages
    "pHLevels": [7.0]                  # pH levels
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get-data', methods=['GET'])
def get_data():
    return jsonify(sensor_data)

@app.route('/update-data', methods=['POST'])
def update_data():
    """
    Endpoint for Arduino to send live data. Expects JSON payload:
    {
        "waterFlowSensors": [value1, value2, value3, value4],
        "waterLevelSensors": [value1, value2],
        "pHLevels": [value1]
    }
    """
    global sensor_data
    try:
        data = request.json
        sensor_data["waterFlowSensors"] = data.get("waterFlowSensors", sensor_data["waterFlowSensors"])
        sensor_data["waterLevelSensors"] = data.get("waterLevelSensors", sensor_data["waterLevelSensors"])
        sensor_data["pHLevels"] = data.get("pHLevels", sensor_data["pHLevels"])
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
