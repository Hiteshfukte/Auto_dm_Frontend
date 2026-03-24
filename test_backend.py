import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_health():
    print("\n--- Testing Health Check ---")
    try:
        r = requests.get(f"{BASE_URL}/")
        print(f"Status: {r.status_code}")
        print(f"Response: {r.json()}")
    except Exception as e:
        print(f"Error: {e}")

def test_webhook_verify():
    print("\n--- Testing Webhook Verification ---")
    params = {
        "hub.mode": "subscribe",
        "hub.verify_token": "verify123",
        "hub.challenge": "challenge_accepted_123"
    }
    try:
        r = requests.get(f"{BASE_URL}/api/webhook", params=params)
        print(f"Status: {r.status_code}")
        print(f"Response: {r.text}")
    except Exception as e:
        print(f"Error: {e}")

def test_mock_comment_webhook():
    print("\n--- Testing Mock Comment Webhook ---")
    # First, let's create a dummy automation rule so the keyword matches
    print("Creating dummy automation rule...")
    auto_data = {
        "name": "Test Rule",
        "keyword": "test",
        "message": "Hello from V2!",
        "active": True
    }
    requests.post(f"{BASE_URL}/api/automations", json=auto_data)

    # Now send the webhook
    payload = {
        "entry": [{
            "changes": [{
                "field": "comments",
                "value": {
                    "text": "test",
                    "from": {"id": "user123"},
                    "media": {"id": "reel456"},
                    "id": "comment789"
                }
            }]
        }]
    }
    try:
        r = requests.post(f"{BASE_URL}/api/webhook", json=payload)
        print(f"Status: {r.status_code}")
        print(f"Response: {r.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print("Starting V2 Backend Tests...")
    test_health()
    test_webhook_verify()
    test_mock_comment_webhook()
    print("\nTests complete. Check the server console logs for 'Triggering Automation' success messages!")
