from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from db.db import init_db
from mines import mines
import random, uuid, json
import math

def stake_mines_multiplier(revealed: int, mines: int, total_tiles: int = 25) -> float:
    if revealed == 0:
        return 1.00
    safe = total_tiles - mines
    prob = 1.0
    for i in range(revealed):
        prob *= (total_tiles - i) / (safe - i)
    return round(prob * 0.99, 2)  # Exact 1% house edge 

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def generate_id():
    return str(uuid.uuid4())


# --- Root route ------------------------------------------------
@app.get("/")
def read_root():
    result = [random.choice(["L", "R"]) for _ in range(8)]
    return {"result": result}


# --- Wallet balance route --------------------------------------
@app.post("/wallet/balance")
async def get_balance(req: Request):
    data = await req.json()
    user_id = data.get("userId")

    conn = await init_db()
    try:
        query = 'SELECT balance FROM wallet WHERE "userId" = $1'
        record = await conn.fetchrow(query, user_id)
        if record:
            return {"balance": record["balance"]}
        return {"error": "User not found"}
    finally:
        await conn.close()


# --- Start mines game ------------------------------------------
@app.post("/games/mines/start")
async def start_mines_game(req: Request):
    data = await req.json()
    bet = float(data.get("bet"))
    mines_count = int(data.get("minesCount"))
    client_secret = data.get("clientSecret")
    user_id = data.get("userId")

    game = mines(bet, mines_count, client_secret)
    important_values = game.return_important_values()

    conn = await init_db()
    try:

        # 💰 Deduct balance safely
        await conn.execute(
            'UPDATE wallet SET balance = balance - $1 WHERE "userId" = $2',
            bet, user_id
        )

        # 🎮 Create seed entry and return seed_id
        query = """
        INSERT INTO seed (id, "clientSeed", "serverSeed", "hashedServerSeed", "userId", nonce, "isUsed")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
        """

        record = await conn.fetchrow(
            query,
            generate_id(),
            important_values["client_seed"],
            important_values["server_seed"],
            important_values["hash_server_seed"],
            user_id,
            important_values["nonce"],
            important_values["isUsed"]
        )
        seed_id = record["id"]

        # 🎲 Create bet entry and return bet_id
        query = """
        INSERT INTO bet (id, amount, outcome, "userId", "gameId", "gameData", "gameName", "seedId")
        VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8)
        RETURNING id;
        """

        game_data = {
            "mines": important_values["mines"],
            "multiplier": 1.0,
            "tilesRemaining": 25,
            "mines_positions": list(important_values["mines_positions"])  #converted set into list
        }

        record = await conn.fetchrow(
            query,
            generate_id(),
            bet,
            "in_progress",
            user_id,
            str(1),
            json.dumps(game_data),   # 👈 convert dict → JSON string
            "mines",
            seed_id
        )
        bet_id = record["id"]

        return {
            "gameId": seed_id,
            "hash_server_seed": important_values["hash_server_seed"],
            "multiplier": game_data["multiplier"],
            "tilesRemaining": game_data["tilesRemaining"],
            "betId": bet_id
        }

    finally:
        await conn.close()


@app.post("/games/mines/reveal")
async def reveal_mines_cell(req: Request):
    data = await req.json()
    cell_index = int(data.get("cellIndex"))
    bet_id = data.get("betId")
    user_id = data.get("userId")

    conn = await init_db()
    try:
        record = await conn.fetchrow(
            'SELECT "gameData", amount FROM bet WHERE id = $1 AND "userId" = $2 AND outcome = $3',
            bet_id, user_id, "in_progress"
        )
        if not record:
            return {"error": "Invalid or finished bet"}

        game_data = record["gameData"]
        if isinstance(game_data, str):
            game_data = json.loads(game_data)

        mines_positions = set(game_data["mines_positions"])
        current_revealed = 25 - game_data["tilesRemaining"]  # how many gems already opened
        mines_count = len(mines_positions)

        if cell_index in mines_positions:
            # BOOM! Lost
            await conn.execute(
                'UPDATE bet SET outcome = $1 WHERE id = $2',
                "lost", bet_id
            )
            return {
                "result": "mine",
                "multiplier": 0.00,
                "payout": 0,
                "mines_positions": list(mines_positions)
            }

        # Safe tile revealed
        new_revealed = current_revealed + 1
        new_multiplier = stake_mines_multiplier(new_revealed, mines_count)

        updated_game_data = {
            "mines": mines_count,
            "multiplier": new_multiplier,
            "tilesRemaining": game_data["tilesRemaining"] - 1,
            "mines_positions": list(mines_positions)
        }

        await conn.execute(
            'UPDATE bet SET "gameData" = $1 WHERE id = $2',
            json.dumps(updated_game_data), bet_id
        )

        return {
            "result": "gem",
            "multiplier": new_multiplier,
            "tilesRemaining": updated_game_data["tilesRemaining"]
            # mines_positions stays hidden until lose/cashout
        }

    finally:
        await conn.close()
# async def reveal_mines_cell(req: Request):
    data = await req.json()
    cell_index = int(data.get("cellIndex"))
    bet_id = data.get("betId")
    user_id = data.get("userId")

    # CHECK KRUNGA FOR REVEAL LOGIC
    conn = await init_db()

    query = "SELECT * FROM bet where id = $1 AND \"userId\" = $2"
    record = await conn.fetchrow(query, bet_id, user_id)

    print((record['gameData']))
    game_data = record["gameData"]
    game_data = json.loads(game_data)
    
    mineLocation = list(game_data['mines_positions'])

    if cell_index in mineLocation:

        # USKE PAISE KHAJUNGA 
        # uska bet ka outcome lost kar dunga
        query = "UPDATE bet SET outcome = $1 WHERE id = $2"
        await conn.execute(query, "lost", bet_id)

        lost_info = {
            "mines_positions": mineLocation,
            "multiplier": 0,
        }

    else:

        # USKA bet mai muliplier badha dunga aur tiles remaining kam kar dunga
        # aur fir uska updated game data wapas kar dunga
        updated_multiplier = game_data['multiplier'] + 0.2  
        updated_tiles_remaining = game_data['tilesRemaining'] - 1

        updated_game_data = {
            "mines_positions": mineLocation,
            "multiplier": updated_multiplier,
            "tilesRemaining": updated_tiles_remaining
        }

        query = "UPDATE bet SET \"gameData\" = $1 WHERE id = $2"
        await conn.execute(query, json.dumps(updated_game_data), bet_id)

        return {
            "mines_positions": mineLocation,
            "multiplier": updated_multiplier,
            "tilesRemaining": updated_tiles_remaining
        }



@app.post("/games/mines/cashout")
async def cashout_mines_game(req: Request):
    data = await req.json()
    bet_id = data.get("betId")
    user_id = data.get("userId")

    conn = await init_db()
    try:
        # Start proper asyncpg transaction
        async with conn.transaction():
            record = await conn.fetchrow(
                'SELECT amount, "gameData" FROM bet WHERE id = $1 AND "userId" = $2 AND outcome = $3',
                bet_id, user_id, "in_progress"
            )
            if not record:
                return {"error": "Cannot cashout: bet not found or already finished"}

            game_data = record["gameData"]
            if isinstance(game_data, str):
                game_data = json.loads(game_data)

            multiplier = game_data.get("multiplier", 1.0)
            payout = round(record["amount"] * multiplier, 2)
            profit = round(payout - record["amount"], 2)

            # Mark bet as won and credit wallet atomically
            await conn.execute('UPDATE bet SET outcome = $1 WHERE id = $2', "won", bet_id)
            await conn.execute(
                'UPDATE wallet SET balance = balance + $1 WHERE "userId" = $2',
                payout, user_id
            )

        # Success response (outside transaction)
        return {
            "status": "cashed_out",
            "multiplier": multiplier,
            "payout": payout,
            "profit": profit
        }

    except Exception as e:
        print("Cashout error:", e)  
        return {"error": "Cashout failed"}
    finally:
        await conn.close()
# async def cashout_mines_game(req: Request):
    data = await req.json()
    bet_id = data.get("betId")
    user_id = data.get("userId")

    # CHECK KRUNGA FOR CASHOUT LOGIC
    conn = await init_db()

    query = "SELECT * FROM bet where id = $1 AND \"userId\" = $2"
    record = await conn.fetchrow(query, bet_id, user_id)

    return {"status": "cashed_out"}