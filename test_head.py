import requests

URL = "https://bari-paleobiologic-perspectively.ngrok-free.dev/api/webhook?hub.mode=subscribe&hub.verify_token=verify123&hub.challenge=test_challenge"

def test_head():
    print("Testing HEAD request...")
    try:
        response = requests.head(URL)
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {response.headers}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_head()
