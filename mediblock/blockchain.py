import hashlib
import json
import time
from ecdsa import SigningKey, VerifyingKey, NIST384p

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
        return hashlib.sha256(json.dumps(block).encode()).hexdigest()
    
    def add_transaction(self, sender_blockchain_address, recipient_blockchain_address, value, drug):
        transaction = {
            'sender_blockchain_address': sender_blockchain_address,
            'recipient_blockchain_address': recipient_blockchain_address,
            'drug_name': drug,
            'value': value,
        }
        self.transaction_pool.append(transaction)
    
    def valid_proof(self, transactions, previous_hash, nonce):
        guess = {
            'transactions': transactions,
            'previous_hash': previous_hash,
            'nonce': nonce
        }
        guess_hash = self.hash(guess)

        return guess_hash[:2] == '00'
    
    def proof_of_work(self):
        transactions = self.transaction_pool.copy()
        previous_hash = self.hash(self.chain[-1])
        nonce = 0

        while self.valid_proof(transactions, previous_hash, nonce) is False:
            nonce += 1

        return nonce
    
    MINING_SENDER = "THE BLOCKCHAIN"
    MINING_REWARD = 1

    def mining(self):
        self.add_transaction(
            sender_blockchain_address=self.MINING_SENDER,
            recipient_blockchain_address=self.blockchain_address,
            value=self.MINING_REWARD,
            drug="None"
        )

        nonce = self.proof_of_work()

        previous_hash = self.hash(self.chain[-1])
        block = self.create_block(nonce, previous_hash)

        return block
    
class Transaction(object):

    def __init__(self, sender_sk, sender_pk, sender_blockchain_address, recipient_blockchain_address, value, drug):
        self.sender_sk = sender_sk
        self.sender_pk = sender_pk
        self.sender_blockchain_address = sender_blockchain_address
        self.recipient_blockchain_address = recipient_blockchain_address
        self.value = value
        self.drug = drug

    def generate_signature(self):
        transaction = {
            'sender_blockchain_address': self.sender_blockchain_address,
            'recipient_blockchain_address': self.recipient_blockchain_address,
            'drug_name': self.drug,
            'value': self.value,
        }
        sha256 = hashlib.sha256()
        sha256.update(str(transaction).encode('utf-8'))
        message = sha256.digest()

        sk = SigningKey.from_string(
            bytes().fromhex(self.sender_sk), curve=NIST384p
        )
        sk_sign = sk.sign(message)
        signature = sk_sign.hex()

        return signature
    
    def verify_transaction_signature(self, sender_pk, signature, transaction):
        sha256 = hashlib.sha256()
        sha256.update(str(transaction).encode('utf-8'))
        message = sha256.digest()
        signature = bytes().fromhex(signature)
        verifying_key = VerifyingKey.from_string(
            bytes().fromhex(sender_pk), curve=NIST384p
        )
        verified_key = verifying_key.verify(signature, message)

        return verified_key
