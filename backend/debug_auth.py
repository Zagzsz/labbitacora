import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import bcrypt

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "Zagzsz")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

engine = create_engine(DATABASE_URL)

def debug_auth():
    print(f"🧐 Debugging Auth for user: {ADMIN_USERNAME}")
    print(f"🔑 Password from .env: {'***' if ADMIN_PASSWORD else 'MISSING'}")
    
    with engine.connect() as conn:
        result = conn.execute(
            text("SELECT hashed_password FROM usuarios WHERE username = :u"),
            {"u": ADMIN_USERNAME}
        ).fetchone()
        
        if not result:
            print("❌ User not found in database.")
            return
        
        stored_hash = result[0]
        print(f"💾 Stored Hash: {stored_hash}")
        
        # Test verification
        try:
            is_valid = bcrypt.checkpw(
                ADMIN_PASSWORD.encode('utf-8'),
                stored_hash.encode('utf-8')
            )
            print(f"✅ Hashing Match: {is_valid}")
        except Exception as e:
            print(f"❌ Error during verification: {e}")
            
        # Try to re-hash and see if it looks similar
        new_hash = bcrypt.hashpw(ADMIN_PASSWORD.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        print(f"🆕 New Hash would look like: {new_hash}")

if __name__ == "__main__":
    debug_auth()
