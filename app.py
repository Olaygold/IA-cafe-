from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = 'af9f06a24a509e3772990e1a29fa93be03444afd'  # Replace with your actual API key

@app.route('/proxy/network', methods=['GET'])
def get_networks():
    url = 'https://dataplanet.ng/api/get/network/'
    headers = {'Authorization': f'Bearer {API_KEY}'}
    response = requests.get(url, headers=headers)
    return jsonify(response.json())

@app.route('/proxy/topup', methods=['POST'])
def topup():
    url = 'https://dataplanet.ng/api/topup/'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = request.json
    response = requests.post(url, headers=headers, json=payload)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)