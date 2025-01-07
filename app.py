from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def get_data():
    # Mock data for testing
    data = {
        "waterLevel1": 75.5,
        "flowRate1": 2.3
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
