from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# File path for the data.json file
DATA_FILE = "data.json"

# Helper function to read data from JSON file
def read_data():
    with open(DATA_FILE, "r") as file:
        return json.load(file)

# Helper function to write data to JSON file
def write_data(data):
    with open(DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)

# Route to update data (called by ESP32)
@app.route("/api/data", methods=["POST"])
def update_data():
    try:
        # Parse the incoming JSON data
        new_data = request.json

        # Write the new data to the JSON file
        write_data(new_data)

        return jsonify({"status": "success", "message": "Data updated"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

# Route to retrieve data (called by frontend)
@app.route("/api/data", methods=["GET"])
def get_data():
    try:
        # Read the data from the JSON file
        data = read_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
