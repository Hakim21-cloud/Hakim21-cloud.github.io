from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Simulated data
def get_simulated_data():
    return {
        "waterFlow": [
            random.uniform(1.0, 15.0) for _ in range(4)
        ],  # In liters/min for 4 sensors
        "waterLevel": [
            random.uniform(40, 100) for _ in range(2)
        ],  # Percentage for 2 sensors
        "pHLevel": [
            random.uniform(6.5, 8.0)
        ],  # pH level
        "waterBill": round(random.uniform(50, 200), 2),  # Estimated bill
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data', methods=['GET'])
def data():
    # Replace with actual IoT data retrieval logic if needed
    return jsonify(get_simulated_data())

if __name__ == '__main__':
    app.run(debug=True)
