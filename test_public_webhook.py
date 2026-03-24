import requests

# Use the user's public ngrok URL
BACKEND_URL = "https://bari-paleobiologic-perspectively.ngrok-free.dev"

def test_comment_event():
    print("Testing Comment Event (POST) via public Ngrok...")
    payload = {
        "object": "instagram",
        "entry": [
            {
                "id": "17841465168913962", # Using the ID from the DB
                "time": 12345678,
                "changes": [
                    {
                        "field": "comments",
                        "value": {
                            "from": {"id": "target_user_id", "username": "test_user"},
                            "media": {"id": "media_123"},
                            "id": "comment_123",
                            "text": "send it"
                        }
                    }
                ]
            }
        ]
    }
    try:
        response = requests.post(f"{BACKEND_URL}/api/webhook", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_comment_event()
