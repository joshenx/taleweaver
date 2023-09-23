from supabase import Client

def get_users(db: Client):
    users = db.table("users").select("*").execute()
    return users['data']