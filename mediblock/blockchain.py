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
    
    def add_transaction(self, date_dispensing: str, pharmacy: str, medical_institution_name: str, drug_name: str, value: int, supply: int):
        transaction = {
            'date_dispensing': date_dispensing,
            'pharmacy': pharmacy,
            'medical_institution_name': medical_institution_name,
            'drug_name': drug_name,
            'value': value,
            'supply': supply
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
    
    MINING_SENDER = "DRUG STORE"
    MINING_REWARD = 0

    def mining(self):
        self.add_transaction(
            date_dispensing="",
            pharmacy=self.MINING_SENDER,
            medical_institution_name="",
            drug_name="",
            value=self.MINING_REWARD,
            supply=0
        )

        nonce = self.proof_of_work()

        previous_hash = self.hash(self.chain[-1])
        block = self.create_block(nonce, previous_hash)

        return block
    
class Transaction(object):

    def __init__(self, sender_sk, sender_pk, date_dispensing: str, pharmacy: str, medical_institution_name: str, drug_name: str, value: int, supply: int):
        self.sender_sk = sender_sk
        self.sender_pk = sender_pk
        self.day_dispensing = date_dispensing
        self.pharmacy = pharmacy
        self.medical_institution_name = medical_institution_name
        self.drug_name = drug_name
        self.value = value
        self.supply = supply

    def generate_signature(self):
        transaction = {
            'day_dispensing': self.day_dispensing,
            'pharmacy': self.pharmacy,
            'medical_institution_name': self.medical_institution_name,
            'drug_name': self.drug_name,
            'value': self.value,
            'supply': self.supply
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
