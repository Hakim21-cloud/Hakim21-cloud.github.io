from flask import Flask, request, jsonify

app = Flask(__name__)

data = {
    "waterLevel1": 0,
    "waterLevel2": 0,
    "flowRate1": 0,
    "flowRate2": 0,
    "flowRate3": 0,
    "flowRate4": 0,
    "pH": 0,
    "totalFlow": 0,
}

@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(data)

@app.route("/api/data", methods=["POST"])
def update_data():
    global data
    data.update(request.json)
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
