import pytest
from httpx import AsyncClient

from dependencies import get_current_user
from main import app
from models import User


@pytest.mark.asyncio
async def test_login_success(client: AsyncClient, monkeypatch):
    """Тест успешной авторизации."""

    async def fake_login(self, username, password):
        return {
            "access_token": "access123",
            "refresh_token": "refresh123",
            "token_type": "bearer"
        }

    monkeypatch.setattr("services.auth_manager.AuthManager.login", fake_login)

    response = await client.post("/auth/token", data={"username": "user1", "password": "Password1!"})
    assert response.status_code == 201
    data = response.json()
    assert data["access_token"] == "access123"
    assert data["token_type"] == "bearer"


# -----------------------------------------------------------
# /auth/refresh — Обновление токена
# -----------------------------------------------------------
@pytest.mark.asyncio
async def test_refresh_success(client: AsyncClient, monkeypatch):
    """Тест успешного обновления токена."""

    async def fake_refresh_token(self, token):
        return {
            "access_token": "new_access",
            "refresh_token": "new_refresh",
            "token_type": "bearer"
        }

    monkeypatch.setattr("services.auth_manager.AuthManager.refresh_token", fake_refresh_token)

    response = await client.post("/auth/refresh", json={"refresh_token": "refresh123"})
    assert response.status_code == 201
    data = response.json()
    assert data["access_token"] == "new_access"
    assert data["token_type"] == "bearer"


# -----------------------------------------------------------
# /auth/me — Получение текущего пользователя
# -----------------------------------------------------------
@pytest.mark.asyncio
async def test_me_success(client: AsyncClient, monkeypatch):
    """Тест получения информации о текущем пользователе."""

    fake_user = User(
        id=1,
        full_name="Test User",
        username="test_user",
        hashed_password="hashed123",
        is_superuser=False,
    )

    async def fake_current_user():
        return fake_user

    # 👇 подменяем зависимость
    app.dependency_overrides[get_current_user] = fake_current_user

    response = await client.get("/auth/me")
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "test_user"
    assert data["full_name"] == "Test User"


# -----------------------------------------------------------
# /auth/change-password — Изменение пароля
# -----------------------------------------------------------
@pytest.mark.asyncio
async def test_change_password_success(client: AsyncClient, monkeypatch):
    """Изменение пароля — успех."""

    async def fake_change_password(self, user, old, new):
        return None

    monkeypatch.setattr("services.auth_manager.AuthManager.change_password", fake_change_password)

    async def fake_current_user():
        return User(
            id=1,
            full_name="Test User",
            username="test_user",
            hashed_password="hashed123",
            is_superuser=False,
        )

    app.dependency_overrides[get_current_user] = fake_current_user

    response = await client.post(
        "/auth/change-password",
        json={"old_password": "OldPass1!", "new_password": "NewPass1!"},
    )
    assert response.status_code == 204

    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_change_password_invalid_password(client: AsyncClient):
    """Изменение пароля — невалидный новый пароль."""

    async def fake_current_user():
        return User(
            id=1,
            full_name="Test User",
            username="test_user",
            hashed_password="hashed123",
            is_superuser=False,
        )

    app.dependency_overrides[get_current_user] = fake_current_user

    response = await client.post(
        "/auth/change-password",
        json={"old_password": "OldPass1!", "new_password": "short"},
    )
    assert response.status_code == 422

    app.dependency_overrides.clear()