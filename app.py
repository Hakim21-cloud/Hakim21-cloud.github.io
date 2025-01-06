from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Placeholder data
data = {
    "waterLevel1": 0,
    "waterLevel2": 0,
    "flowRate1": 0,
    "flowRate2": 0,
    "totalLiters": 0,
    "pHValue": 0,
}


@app.route("/api/data", methods=["GET"])
def get_data():
    """Return current data as JSON."""
    return jsonify(data)


@app.route("/api/data", methods=["POST"])
def post_data():
    """Update data from ESP32."""
    global data
    if request.is_json:
        data = request.get_json()
        return jsonify({"status": "success", "message": "Data updated"}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid JSON"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
