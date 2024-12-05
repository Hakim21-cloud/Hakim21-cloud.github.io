from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Simulated data
sensor_data = {
    "waterFlow": [5, 10, 7, 12],  # In liters/min
    "waterLevel": [50, 60],       # Percentage
    "pHLevel": [7.0, 7.2, 6.8, 7.1],  # pH readings
    "waterBill": 120.75  # Example bill amount
}

@app.route('/')
def main_menu():
    return render_template('index.html')

@app.route('/get-data', methods=['GET'])
def get_data():
    return jsonify(sensor_data)

@app.route('/control-valve', methods=['POST'])
def control_valve():
    action = request.json.get('action')
    if action == "open":
        return jsonify({"status": "Valve Opened"})
    elif action == "close":
        return jsonify({"status": "Valve Closed"})
    else:
        return jsonify({"status": "Invalid Action"}), 400

if __name__ == '__main__':
    app.run(debug=True)
