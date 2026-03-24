# 🔧 Auto_DM_v2 — Complete Solution Guide
> If anything breaks, this file has ALL the answers.

---

## ✅ What We Built
An Instagram **Comment-to-DM automation** that:
1. User comments a **keyword** (e.g., `send it`) on a Reel
2. Backend receives the comment via **Meta Webhook**
3. Backend sends a **Private Reply** (DM widget/banner) to the user via **Meta Graph API**
4. User receives the message + link **directly in their Instagram DMs**

---

## 🏗️ Architecture

```
Instagram Comment → Meta Webhook → FastAPI Backend → Meta Graph API → Instagram DM
```

### Key Files
| File | Purpose |
|---|---|
| `services/messenger.py` | Sends Private Replies & DMs via `graph.instagram.com` |
| `services/comment_handler.py` | Processes comment events, triggers private reply |
| `services/gate_logic.py` | Handles "YES" DM responses (follow gate / 24h window) |
| `routes/webhook.py` | Receives Meta webhooks, always returns 200 |
| `routes/auth.py` | Facebook OAuth login to get Page Access Token |
| `config.py` | Reads/writes config from DB + env |
| `database.py` | SQLite schema (automations, users, gate_status, sent_dms) |
| `.env` | Secrets (App ID, App Secret, Verify Token) |

---

## 🔑 Critical Configuration

### 1. Meta App Settings (developers.facebook.com)
- **App Type**: Business
- **Products Added**: Instagram Graph API, Facebook Login, Webhooks
- **Webhook URL**: `https://bari-paleobiologic-perspectively.ngrok-free.dev/api/webhook`
- **Verify Token**: `verify123`
- **Webhook Fields**: `comments`, `messages` (under Instagram)
- **Instagram Business Login Redirect**: `https://<your-ngrok>/api/auth/instagram/callback`
- **Facebook Login Redirect**: `https://<your-ngrok>/api/auth/facebook/callback`

### 2. Tokens (stored in bot.db → config table)
| Key | Value | How to Get |
|---|---|---|
| `IG_ACCESS_TOKEN` | Page Access Token (starts with `IGA...`) | Facebook Login flow → `/api/auth/facebook/login` |
| `IG_BUSINESS_ID` | `17841465168913962` | Auto-saved during OAuth callback |

### 3. .env File
```env
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
VERIFY_TOKEN=verify123
BACKEND_URL=https://your-ngrok-url.ngrok-free.dev
```

---

## 🚀 How to Start (From Scratch)

```bash
# 1. Start the backend
.\venv\Scripts\python -m uvicorn main:app --reload --port 8000

# 2. Start ngrok (separate terminal)
ngrok http --url=bari-paleobiologic-perspectively.ngrok-free.dev 8000

# 3. Get a fresh token (open in browser)
# https://bari-paleobiologic-perspectively.ngrok-free.dev/api/auth/facebook/login

# 4. Test! Comment "send it" on a Reel
```

---

## 🛠️ The API That Makes It Work

### Private Reply (Comment → DM)
```
POST https://graph.instagram.com/v21.0/{IG_BUSINESS_ID}/messages
Headers: Authorization: Bearer {IG_ACCESS_TOKEN}
Body: {
  "recipient": { "comment_id": "<comment_id>" },
  "message": { "text": "Your message here" }
}
```

### Direct DM (24h Window Response)
```
POST https://graph.instagram.com/v21.0/{IG_BUSINESS_ID}/messages
Headers: Authorization: Bearer {IG_ACCESS_TOKEN}
Body: {
  "recipient": { "id": "<user_igsid>" },
  "message": { "text": "Your message here" }
}
```

### Public Comment Reply
```
POST https://graph.facebook.com/v21.0/{comment_id}/replies
Params: message=Your+reply&access_token={IG_ACCESS_TOKEN}
```

---

## ❌ Common Errors & Fixes

### Error #3: "Application does not have the capability"
**Cause**: Missing permissions or wrong token type.
**Fix**:
1. Ensure your app has `instagram_manage_messages` permission
2. Use a **Page Access Token** (not a User token)
3. Re-run the Facebook login flow: `/api/auth/facebook/login`
4. Make sure app is in **Live Mode** (not Development)

### Error 100 / Subcode 33: "Private replies not allowed"
**Cause**: Trying `private_replies` endpoint instead of `messages`.
**Fix**: Use `graph.instagram.com/{ig_id}/messages` with `recipient.comment_id`

### Token Expired
**Symptoms**: All API calls return 190 error.
**Fix**: Re-login via `/api/auth/facebook/login`

### Webhook Not Receiving Events
**Fix**:
1. Check ngrok is running: `ngrok http --url=your-url 8000`
2. Verify webhook in Meta Dashboard → Webhooks → Instagram
3. Ensure `comments` and `messages` fields are subscribed

### Self-Comment Loop (Bot replying to itself)
**Fix**: Already handled in `comment_handler.py` — skips comments from `IG_BUSINESS_ID`

### "is_deleted" Messages
**Fix**: Already handled in `gate_logic.py` — skips deleted message events

---

## 📋 Database Schema (bot.db)

| Table | Purpose |
|---|---|
| `automations` | Keyword rules (keyword, message, link, follow_gate, media_id) |
| `sent_dms` | Tracks which users got DMs (prevents duplicates) |
| `gate_status` | Follow gate progress (attempts per user per media) |
| `users` | Maps IGSID → Instagram username |
| `config` | Persistent key-value store (tokens, IDs) |

---

## 🔄 Full Flow Diagram

```
1. hiteshfukte_ comments "send it" on a Reel
         ↓
2. Meta sends webhook to /api/webhook (comment event)
         ↓
3. comment_handler.py matches keyword → finds automation rule
         ↓
4. messenger.py → send_private_reply(comment_id, message+link)
         ↓
5. POST graph.instagram.com/v21.0/{ig_id}/messages
   Body: { recipient: {comment_id}, message: {text} }
         ↓
6. META PRIVATE REPLY: 200 ✅
         ↓
7. hiteshfukte_ receives DM widget in Instagram!
```

---

*Last Updated: 2026-03-24 | Status: WORKING ✅*
