from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate_carbon():
    data = request.get_json()
    vehicle_model = data.get('vehicle_model')
    distance = data.get('distance')
    
    if not vehicle_model or not distance:
        return jsonify({"error": "Missing vehicle model or distance"}), 400
    
    try:
        distance = float(distance)
    except ValueError:
        return jsonify({"error": "Distance must be a number"}), 400
    
    api_url = "https://www.carboninterface.com/api/v1/estimates"
    headers = {
        "Authorization": "Bearer AIzaSyCwEro-wQ6YUNcA1ozA9FQev-DyJp3t2EQ",
        "Content-Type": "application/json"
    }
    payload = {
        "type": "vehicle",
        "distance_unit": "km",
        "distance_value": distance,
        "vehicle_model": vehicle_model
    }
    
    response = requests.post(api_url, json=payload, headers=headers)
    if response.status_code != 200:
        return jsonify({"error": "API request failed", "details": response.text}), 500
    
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
