from dotenv import load_dotenv
import asyncpg


load_dotenv()

conn = None

async def init_db():
    try :
        global conn
        conn = await asyncpg.connect(
            host="localhost",
            port=5432,
            user="user",
            password="password",
            database="gaming_site_db"
        )
        print("Database connection pool initialized.")
        return conn
    except Exception as e:
        print("Error initializing database connection pool:", e)
        raise e