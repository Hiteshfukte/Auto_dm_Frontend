"""
Authentication middleware for Auto_DM V2.

Provides Bearer token verification via two strategies (checked in order):
  1. API_KEY  — simple secret-key comparison (always available)
  2. JWT_SECRET — HS256 JWT validation (used when JWT_SECRET is set)

Usage as a FastAPI dependency:
    from middleware.auth import verify_token
    from fastapi import Depends

    @router.get("/protected", dependencies=[Depends(verify_token)])
    def protected_route(): ...

Public routes (no token required) are listed in PUBLIC_ROUTES below.
"""

import os
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

# ---------------------------------------------------------------------------
# Routes that are intentionally public — no token required.
# Exact path matching; add new paths here as needed.
# ---------------------------------------------------------------------------
PUBLIC_ROUTES: set[str] = {
    "/api/auth/instagram/login",
    "/api/auth/instagram/callback",
    "/api/auth/facebook/login",
    "/api/auth/facebook/callback",
    "/api/webhook",
}

# ---------------------------------------------------------------------------
# HTTPBearer scheme — auto-extracts the token from "Authorization: Bearer …"
# auto_error=False so we can return a cleaner 401 ourselves.
# ---------------------------------------------------------------------------
_bearer_scheme = HTTPBearer(auto_error=False)


def _get_api_key() -> Optional[str]:
    """Return the configured API key, or None if not set."""
    return os.getenv("API_KEY")


def _get_jwt_secret() -> Optional[str]:
    """Return the configured JWT secret, or None if not set."""
    return os.getenv("JWT_SECRET")


def _verify_jwt(token: str, secret: str) -> bool:
    """
    Validate a HS256-signed JWT.

    Returns True when the token is valid, False otherwise.
    Requires the 'python-jose' package (jose.jwt).
    """
    try:
        from jose import JWTError, jwt  # type: ignore

        jwt.decode(token, secret, algorithms=["HS256"])
        return True
    except Exception:
        return False


def verify_token(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer_scheme),
) -> str:
    """
    FastAPI dependency that enforces Bearer token authentication.

    Raises HTTP 401 when:
      - The Authorization header is missing or not a Bearer token.
      - The token does not match API_KEY (simple comparison).
      - JWT_SECRET is set and the token fails JWT validation.

    Returns the raw token string on success so callers can inspect it
    if needed.
    """
    _unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing authentication token.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if credentials is None:
        raise _unauthorized

    token: str = credentials.credentials

    api_key = _get_api_key()
    jwt_secret = _get_jwt_secret()

    # --- Strategy 1: JWT validation (when JWT_SECRET is configured) ----------
    if jwt_secret:
        if not _verify_jwt(token, jwt_secret):
            raise _unauthorized
        return token

    # --- Strategy 2: Static API key comparison (fallback) -------------------
    if api_key:
        if token != api_key:
            raise _unauthorized
        return token

    # Neither API_KEY nor JWT_SECRET is configured — fail closed.
    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail=(
            "Authentication is not configured on this server. "
            "Set API_KEY or JWT_SECRET in the environment."
        ),
    )
