import hashlib
import json
import time

class BlockChain(object):
    def __init__(self, blockchain_address=None):
        self.transaction_pool = []
        self.chain = []
        self.create_block(0, self.hash({}))
        self.blockchain_address = blockchain_address

    def create_block(self, nonce, previous_hash):
        block = {
            'timestamp': time.time(),
            'transactions': self.transaction_pool,
            'nonce': nonce,
            'previous_hash': previous_hash
        }
        self.chain.append(block)
        self.transaction_pool = []
        
        return block
    
    def hash(self, block):
        block_string = json.dumps(block, sort_keys=True).encode()

        return hashlib.sha256(block_string).hexdigest()
    
    def add_transaction(self, sender_blockchain_address, recipient_blockchain_address, value, drug, sender_public_key=None):
        transaction = {
            'sender_blockchain_address': sender_blockchain_address,
            'recipient_blockchain_address': recipient_blockchain_address,
            'drug_name': drug,
            'value': value,
        }
        self.transaction_pool.append(transaction)

        return True