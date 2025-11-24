import secrets
import string
from datetime import datetime, timedelta

from passlib.hash import argon2
from jose import jwt, JWTError

from auth.schemas import Token
from core.exceptions import InvalidToken
from core.settings import TIMEZONE, REFRESH_TIME, SECRET_KEY, ACCESS_TIME
from user.models import User


class TokenService:
    def __generate_token(self, user: User, is_refresh: bool = False) -> str:
        exp = datetime.now(tz=TIMEZONE) + (
            timedelta(hours=int(REFRESH_TIME)) if is_refresh else timedelta(hours=int(ACCESS_TIME)))
        token = jwt.encode(
            {
                "sub": str(user.id),
                "username": user.username,
                "exp": exp,
                "refresh": is_refresh
            },
            SECRET_KEY,
            "HS256"
        )
        return token

    def generate(self, user: User) -> Token:
        access_token = self.__generate_token(user)
        refresh_token = self.__generate_token(user, True)
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="Bearer",
        )

    def __validate_token(self, token: str) -> dict:
        try:
            return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

        except JWTError:
            raise InvalidToken("Invalid Credentials")

    def validate(self, token: str, is_refresh: bool = False) -> dict:
        payload = self.__validate_token(token)
        if is_refresh is True and bool(payload.get("refresh")) is False:
            raise InvalidToken("Invalid Credentials")
        return payload


class PasswordService:
    def __init__(self, length: int = 12):
        self.length = length
        self.alphabet = string.ascii_letters + string.digits + string.punctuation

    def generate_password(self) -> str:
        """Генерация случайного пароля"""
        return ''.join(secrets.choice(self.alphabet) for _ in range(self.length))

    def hash_password(self, password: str) -> str:
        """Хэширование пароля через Argon2"""
        return argon2.hash(password)

    def verify_password(self, password: str, password_hash: str) -> bool:
        """Проверка пароля"""
        return argon2.verify(password, password_hash)

    def generate_and_hash(self) -> tuple[str, str]:
        """
        Сгенерировать пароль и вернуть (plain, hash)
        plain → отправляем пользователю (например, по email)
        hash  → сохраняем в БД
        """
        plain = self.generate_password()
        hashed = self.hash_password(plain)
        return plain, hashed
