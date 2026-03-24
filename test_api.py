import requests
from config import get_config

def test():
    token = 'IGAAfecfy0ncJBZAGF3RzUwWi1Kb1RmQlBDaEwyRHFmSlU3N0xmUkdheGZAQMTBMUnZAIaFpvVHM5aVVZAVTFJQlhLQ3VhdU1vY1FrRFU4Mmhwb2FEVWdrSUpYTERpNE0wZAjk3WXBLZAERwd3NJcHpQUDNLUHZANcU1sczBjdGxYTnY5ZAwZDZD'
    ig_id = get_config("IG_BUSINESS_ID")
    
    # 1. Inspect Token Safely
    print(f"Token (First 15 chars): {token[:15]}...")
    print(f"Token (Last 15 chars): ...{token[-15:]}")
    print(f"Token length exactly: {len(token)}")
    print(f"IG ID: {ig_id}")
    
    # 2. Test send_private_reply logic
    url = f"https://graph.instagram.com/v21.0/{ig_id}/messages"
    print(f"URL: {url}")
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "recipient": {"id": "1382909329391520"},
        "message": {"text": "Diagnostic Test Private Reply"}
    }
    
    try:
        res = requests.post(url, headers=headers, json=payload)
        print(f"STATUS: {res.status_code}")
        print(f"RESPONSE: {res.json()}")
    except Exception as e:
        print(f"Request Error: {e}")

if __name__ == "__main__":
    test()
