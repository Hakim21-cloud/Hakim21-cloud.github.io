from flask import Flask, jsonify, render_template

app = Flask(__name__)

# Simulated data
sensor_data = {
    "flow": [10, 20, 15, 25],   # Water flow sensors in L/min
    "level": [60, 70],          # Water level sensors in percentage
    "pH": [7.2, 7.4, 6.8, 7.1], # pH readings
    "bill": 250.75              # Example water bill
}

@app.route('/')
def index():
    return render_template('layout.html')  # Layout for dynamic pages

@app.route('/data')
def get_data():
    return jsonify(sensor_data)

if __name__ == '__main__':
    app.run(debug=True)
