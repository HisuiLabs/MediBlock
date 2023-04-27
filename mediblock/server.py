from flask import Flask, jsonify, request
from flask_cors import CORS
from blockchain import BlockChain, Transaction

app = Flask(__name__)
CORS(app)
blockchain = BlockChain()

@app.route('/', methods=['GET'])
def index():
    return "Hello, World!"

@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    values = request.get_json()
    required = ['date_dispensing', 'pharmacy', 'medical_institution_name', 'drug_name', 'value', 'supply']
    if not all(k in values for k in required):
        return 'Missing values', 400
    
    day_dispensing = values['date_dispensing']
    pharmacy = values['pharmacy']
    medical_institution_name = values['medical_institution_name']
    drug_name = values['drug_name']
    value = values['value']
    supply = values['supply']
    
    blockchain.add_transaction(day_dispensing, pharmacy, medical_institution_name, drug_name, value, supply)
    
    response = {'message': 'Transaction will be added to Block '}
    return jsonify(response), 201

@app.route('/mine', methods=['GET'])
def mine():
    block = blockchain.mining()
    
    response = {
        'message': 'New Block Mined',
    }
    return jsonify(response), 200

@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain),
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.denug = True
    app.run(host='0.0.0.0', port=5000)
