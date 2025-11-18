import random
import hashlib
import hmac

class mines :

    def __init__(self, bet: float ,mines: int , client_secret: str ) -> None:
        self.bet = bet
        self.mines = mines
        self.total_cells = 25
        self.client_secret = client_secret
        self.server_secret = self.generate_secret()
        self.hash = self.generate_hash()
        self.mines_positions = self.generate_mines()
        self.hashed_server_secret = self.generate_hashed_server_secret()
        self.nonce = 0
        self.isUsed = False

    def generate_secret(self):
        secret = random.randint(1,1000)
        return secret

    def generate_hash(self):
        client_secret_bytes = self.client_secret.encode()
        server_secret_bytes = str(self.server_secret).encode()
        hash_object = hmac.new(client_secret_bytes, server_secret_bytes, hashlib.sha256).digest()
        return hash_object

    def generate_hashed_server_secret(self):
        return hashlib.sha256(str(self.server_secret).encode()).hexdigest()

    def generate_mines(self):
        byte_offset = 0
        mines = set()
        while len(mines) < self.mines:
            chunk = self.hash[byte_offset:byte_offset + 4]
            chunk = int.from_bytes(chunk, 'big') % 25
            mines.add(chunk)
            byte_offset += 4
        return mines

    def return_important_values(self):
        return {
            "bet" : self.bet,
            "mines" : self.mines,
            "mines_positions" : self.mines_positions,
            "server_seed" : str(self.server_secret),
            "client_seed" : str(self.client_secret),
            "hash_server_seed" : str(self.hashed_server_secret),
            "nonce" : self.nonce,
            "isUsed" : self.isUsed
        }
