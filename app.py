"""
Auto_DM V2 — FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import automations, stats, auth, instagram, config, webhook
from database import init_db
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize Database on startup
init_db()

app = FastAPI(title="Auto_DM V2")

# CORS — Allow frontend (localhost:3000) and any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import Request
from middleware.auth import PUBLIC_ROUTES, verify_token

@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    """
    Global authentication middleware.

    Requests whose path exactly matches a PUBLIC_ROUTES entry are allowed
    through without a token.  All other requests must carry a valid Bearer
    token in the Authorization header; if the token is missing or invalid
    the middleware short-circuits with a 401 response.
    """
    from fastapi.responses import JSONResponse
    from fastapi.security import HTTPAuthorizationCredentials

    path = request.url.path

    # Strip trailing slash for consistent matching
    normalised = path.rstrip("/") or "/"

    if normalised not in PUBLIC_ROUTES:
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.lower().startswith("bearer "):
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid or missing authentication token."},
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = auth_header[len("Bearer "):].strip()
        credentials = HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)
        try:
            verify_token(credentials)
        except Exception as exc:
            status_code = getattr(exc, "status_code", 401)
            detail = getattr(exc, "detail", "Unauthorized")
            return JSONResponse(
                status_code=status_code,
                content={"detail": detail},
                headers={"WWW-Authenticate": "Bearer"},
            )

    return await call_next(request)


@app.middleware("http")
async def log_all_requests(request: Request, call_next):
    # This automatically tricks Ngrok into skipping its warning screen
    if "ngrok-skip-browser-warning" not in request.headers:
        request.headers._list.append((b"ngrok-skip-browser-warning", b"true"))
    
    # Log the request
    print(f"\n>>> GLOBAL LOG: {request.method} {request.url.path}", flush=True)
    with open("webhook_debug.log", "a", encoding="utf-8") as f:
        f.write(f"\n>>> GLOBAL LOG: {request.method} {request.url.path}\n")
        
    response = await call_next(request)
    return response

# Include Routers
app.include_router(automations.router)
app.include_router(stats.router)
app.include_router(auth.router)
app.include_router(instagram.router)
app.include_router(config.router)
app.include_router(webhook.router)

# Catch-all route for any unhandled paths
@app.api_route("/{path_name:path}", methods=["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"])
async def catch_all(request: Request, path_name: str):
    data = {"method": request.method, "path": path_name}
    try:
        data["body"] = await request.json()
    except:
        data["body"] = "not json"
        
    log_msg = f"\n!!! CATCH-ALL LOG: {request.method} /{path_name} !!!\n{data}\n"
    print(log_msg, flush=True)
    with open("webhook_debug.log", "a", encoding="utf-8") as f:
        f.write(log_msg)
    return {"status": "caught", "path": path_name}
