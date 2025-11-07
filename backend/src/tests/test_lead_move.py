import pytest
from unittest.mock import AsyncMock, patch
from httpx import AsyncClient, ASGITransport

from main import app
from routers import lead
from dependencies import get_current_user
from schemas.user import UserRead
from schemas.role import RoleRead
from exceptions import NotFound


@pytest.mark.anyio
class TestLeadMove:

    async def _mock_user(self, permissions: list[str] | None = None, superuser=False):
        """Создает фейкового пользователя с нужными правами."""
        perms = [{"id": i + 1, "name": f"perm_{p}", "codename": p} for i, p in enumerate(permissions or [])]
        return UserRead(
            id=1,
            full_name="Test User",
            username="testuser",
            email="user@example.com",
            is_superuser=superuser,
            role_id=1,
            role=RoleRead(
                id=1,
                name="Test Role",
                permissions=perms,
            ),
        )

    # 1️⃣ Успешное перемещение лида
    async def test_move_lead_success(self):
        user = await self._mock_user(["update_leads"])
        app.dependency_overrides[lead.has_permission("update_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        with patch("routers.lead.LeadManager.move_lead", new=AsyncMock(return_value=None)):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                body = {"lead_id": 1, "status_id": 2}
                response = await ac.post("/leads/move", json=body)
                assert response.status_code == 201

    # 2️⃣ Лид не найден
    async def test_move_lead_not_found(self):
        user = await self._mock_user(["update_leads"])
        app.dependency_overrides[lead.has_permission("update_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        with patch("routers.lead.LeadManager.move_lead", new=AsyncMock(side_effect=NotFound("Lead not found"))):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                body = {"lead_id": 999, "status_id": 2}
                response = await ac.post("/leads/move", json=body)
                assert response.status_code == 404

    # 3️⃣ Нет прав
    async def test_move_lead_forbidden(self):
        user = await self._mock_user(["view_leads"])  # нет update_leads

        async def forbidden_mock():
            raise Exception("Permission Denied")

        app.dependency_overrides[lead.has_permission("update_leads")] = lambda: forbidden_mock
        app.dependency_overrides[get_current_user] = lambda: user

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            body = {"lead_id": 1, "status_id": 2}
            response = await ac.post("/leads/move", json=body)
            assert response.status_code in (403, 500)

    # 4️⃣ Некорректное тело запроса
    async def test_move_lead_invalid_body(self):
        user = await self._mock_user(["update_leads"])
        app.dependency_overrides[lead.has_permission("update_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            # отсутствует обязательное поле
            body = {"status_id": 2}
            response = await ac.post("/leads/move", json=body)
            assert response.status_code == 422

    # 6️⃣ Неавторизованный пользователь
    async def test_move_lead_unauthorized(self):
        app.dependency_overrides.clear()

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            body = {"lead_id": 1, "status_id": 2}
            response = await ac.post("/leads/move", json=body)
            assert response.status_code in (401, 403)
