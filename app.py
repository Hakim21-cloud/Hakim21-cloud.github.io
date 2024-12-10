from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory storage for live data
data = {
    "flow1": 0,
    "flow2": 0,
    "flow3": 0,
    "flow4": 0,
    "level1": 0,
    "level2": 0,
    "pH": 7.0
}

@app.route('/update', methods=['POST'])
def update_data():
    global data
    data.update(request.json)
    return jsonify({"status": "success"}), 200

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)
    
