from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Path to the JSON file
DATA_FILE = "data.json"

@app.route("/api/data", methods=["POST"])
def update_data():
    try:
        # Get JSON data from the ESP32
        new_data = request.json

        # Write the data to data.json
        with open(DATA_FILE, "w") as f:
            json.dump(new_data, f)

        return jsonify({"status": "success", "message": "Data updated successfully"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route("/api/data", methods=["GET"])
def get_data():
    try:
        # Read the data from data.json
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
