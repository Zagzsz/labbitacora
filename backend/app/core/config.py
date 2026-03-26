from pydantic import field_validator
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str

    # Admin user
    ADMIN_USERNAME: str
    ADMIN_PASSWORD: str
    ADMIN_EMAIL: str

    # Email
    EMAIL_FROM: str
    EMAIL_PASSWORD: str
    EMAIL_HOST: str = "smtp.gmail.com"
    EMAIL_PORT: int = 465

    # CORS
    FRONTEND_URL: str = "http://localhost:5173"

    @field_validator("DATABASE_URL", "SECRET_KEY", "ADMIN_USERNAME", "ADMIN_PASSWORD", "ADMIN_EMAIL", "EMAIL_FROM", "EMAIL_PASSWORD", "FRONTEND_URL", "ALGORITHM")
    @classmethod
    def strip_whitespace(cls, v: str, info) -> str:
        s = v.strip()
        if info.field_name == "FRONTEND_URL":
            return s.rstrip("/")
        return s

    model_config = {"env_file": ".env", "extra": "ignore"}


@lru_cache
def get_settings() -> Settings:
    return Settings()
