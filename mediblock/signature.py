import math
from Crypto.Util import number

class Paillier:
    def xgcd(self, a: int, b: int) -> tuple:
        x0, y0, x1, y1 = 1, 0, 0, 1
        while b != 0:
            q, a, b = a // b, b, a % b
            x0, x1 = x1, x0 - q * x1
            y0, y1 = y1, y0 - q * y1
        return a, x0, y0
    
    def modinv(self, a: int, m: int) -> int:
        g, x, y = self.xgcd(a, m)
        if g != 1:
            raise Exception('modular inverse does not exist')
        else:
            return x % m
    
    def L(self, x: int, n: int) -> int:
        return (x - 1) // n
    
    def paillier_keygen(self, bits: int) -> tuple:
        # prime number p, q
        p = number.getPrime(bits // 2)
        while True:
            q = number.getPrime(bits // 2)
            if p != q:
                break
        n = p * q
        lamda = math.lcm(p - 1, q - 1)
        
        while True:
            g = number.getRandomRange(2, n*n)
            mu = self.modinv(self.L(pow(g, lamda, n*n), n), n)
            if mu is not None:
                break
            
        return (n, g), (lamda, mu)
    
    def paillier_encrypt(self, m: int, pk: int) -> int:
        n, g = pk
        nn = n * n
        # assert (0 <= m and m < n)
        while True:
            r = number.getRandomRange(1, n)
            if math.gcd(r, n) == 1:
                break
        return (pow(g, m, nn) * pow(r, n, nn)) % nn
    
    def paillier_decrypt(self, c: int, pk: int, sk: int) -> int:
        n, g = pk
        lamda, mu = sk
        # assert(0 <= c < n*n)
        return (self.L(pow(c, lamda, n*n), n) * mu) % n
    