import requests

BACKEND_URL = "http://localhost:8000"
VERIFY_TOKEN = "verify123"

def test_verification():
    print("Testing Webhook Verification (GET)...")
    params = {
        "hub.mode": "subscribe",
        "hub.verify_token": VERIFY_TOKEN,
        "hub.challenge": "challenge_123"
    }
    response = requests.get(f"{BACKEND_URL}/api/webhook", params=params)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
    if response.status_code == 200 and response.text == "challenge_123":
        print("✅ Verification Success!")
    else:
        print("❌ Verification Failed!")

def test_comment_event():
    print("\nTesting Comment Event (POST)...")
    payload = {
        "object": "instagram",
        "entry": [
            {
                "id": "12345",
                "time": 12345678,
                "changes": [
                    {
                        "field": "comments",
                        "value": {
                            "from": {"id": "target_user_id", "username": "test_user"},
                            "media": {"id": "media_123"},
                            "id": "comment_123",
                            "text": "Send it!"
                        }
                    }
                ]
            }
        ]
    }
    response = requests.post(f"{BACKEND_URL}/api/webhook", json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.json()}")
    if response.status_code == 200:
        print("✅ Event processing initiated!")
    else:
        print("❌ Event processing failed!")

if __name__ == "__main__":
    try:
        test_verification()
        test_comment_event()
    except Exception as e:
        print(f"Error connecting to backend: {e}")
