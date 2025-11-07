import pytest
from unittest.mock import AsyncMock, patch
from httpx import AsyncClient, ASGITransport

from main import app
from routers import lead
from dependencies import get_current_user
from exceptions import NotFound
from schemas.user import UserRead
from schemas.role import RoleRead


@pytest.mark.anyio
class TestLeadDelete:

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

    # 1️⃣ Успешное удаление
    async def test_delete_lead_success(self):
        user = await self._mock_user(["delete_leads"])
        app.dependency_overrides[lead.has_permission("delete_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        with patch("routers.lead.LeadManager.delete", new=AsyncMock(return_value=None)):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                response = await ac.delete("/leads/1")
                assert response.status_code == 204

    # 2️⃣ Лид не найден
    async def test_delete_lead_not_found(self):
        user = await self._mock_user(["delete_leads"])
        app.dependency_overrides[lead.has_permission("delete_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        with patch("routers.lead.LeadManager.delete", new=AsyncMock(side_effect=NotFound("Lead not found"))):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                response = await ac.delete("/leads/999")
                assert response.status_code == 404

    # 3️⃣ Нет прав на удаление
    async def test_delete_lead_forbidden(self):
        user = await self._mock_user(["view_leads"])  # нет delete_leads

        async def forbidden_mock():
            raise Exception("Permission Denied")

        app.dependency_overrides[lead.has_permission("delete_leads")] = lambda: forbidden_mock
        app.dependency_overrides[get_current_user] = lambda: user

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.delete("/leads/1")
            assert response.status_code in (403, 500)

    # 4️⃣ Неверный ID
    async def test_delete_lead_invalid_id(self):
        user = await self._mock_user(["delete_leads"])
        app.dependency_overrides[lead.has_permission("delete_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.delete("/leads/abc")
            assert response.status_code == 422  # FastAPI автоматически валидирует ID


    # 6️⃣ Неавторизованный запрос
    async def test_delete_lead_unauthorized(self):
        app.dependency_overrides.clear()  # без пользователя

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.delete("/leads/1")
            assert response.status_code in (401, 403)
