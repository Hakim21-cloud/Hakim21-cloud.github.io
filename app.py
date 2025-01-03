from flask import Flask, request, jsonify

app = Flask(__name__)

data = {
    "waterLevel1": 0,
    "waterLevel2": 0,
    "pH": 0,
    "totalFlow": 0,
    "solenoidState": "CLOSED",
    "totalBill": 0,
}

PRICE_PER_LITER = 0.002  # Example price in RM per liter

@app.route("/api/data", methods=["POST"])
def update_data():
    global data
    received_data = request.json
    data.update(received_data)

    # Calculate total bill based on total flow
    data["totalBill"] = data["totalFlow"] * PRICE_PER_LITER

    return jsonify({"status": "success", "message": "Data updated"})

@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(data)

@app.route("/api/solenoid", methods=["POST"])
def control_solenoid():
    global data
    action = request.json.get("action")
    if action == "OPEN":
        data["solenoidState"] = "OPEN"
    elif action == "CLOSE":
        data["solenoidState"] = "CLOSED"
    return jsonify({"status": "success", "solenoidState": data["solenoidState"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
