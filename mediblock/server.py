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
    required = ['sender_blockchain_address', 'recipient_blockchain_address', 'value', 'drug']
    if not all(k in values for k in required):
        return 'Missing values', 400
    
    sender_blockchain_address = values['sender_blockchain_address']
    recipient_blockchain_address = values['recipient_blockchain_address']
    value = values['value']
    drug = values['drug']
    
    blockchain.add_transaction(sender_blockchain_address, recipient_blockchain_address, value, drug)
    
    response = {'message': 'Transaction will be added to Block '}
    return jsonify(response), 201

@app.route('/mine', methods=['GET'])
def mine():
    block = blockchain.mining()
    
    response = {
        "sender_blockchain_address": blockchain.MINING_SENDER,
        "recipient_blockchain_address": blockchain.blockchain_address,
        "drug": "None",
        "value": blockchain.MINING_REWARD,
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
