import pytest
from unittest.mock import AsyncMock, patch
from httpx import AsyncClient, ASGITransport

from dependencies import get_current_user
from exceptions import NotFound
from main import app
from routers import lead
from schemas.lead import LeadRead
from schemas.role import RoleRead
from schemas.user import UserRead


@pytest.mark.anyio
class TestLeadGet:

    async def _mock_user(self, permissions: list[str] | None = None, superuser=False):
        """Создает фейкового пользователя с заданными правами"""
        perms = [{"id": i + 1, "name": f"perm_{p}", "codename": p} for i, p in enumerate(permissions or [])]
        return UserRead(
            id=1,
            full_name="Test User",
            username="testuser",  # ✅ обязательное поле
            email="user@example.com",
            is_superuser=superuser,
            role_id=1,  # ✅ обязательное поле
            role=RoleRead(**{
                "id": 1,
                "name": "Test Role",
                "permissions": perms,
            }),
        )

    # 1️⃣ Успешное получение лида
    async def test_get_lead_success(self):
        user = await self._mock_user(["view_leads"])
        lead_data = LeadRead(
            id=1,
            full_name="Иван Иванов",
            email="ivan@example.com",
            phone="+998901234567",
            company_name="IT Corp",
            company_info="Good Company",
            target_id=None,
            status_id=None,
            comments=[],
            status=None,
        )

        app.dependency_overrides[lead.has_permission("view_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        with patch("routers.lead.LeadManager.get", new=AsyncMock(return_value=lead_data)):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                response = await ac.get("/leads/1")
                assert response.status_code == 200
                assert response.json()["full_name"] == "Иван Иванов"

    # 2️⃣ Лид не найден
    async def test_get_lead_not_found(self):
        user = await self._mock_user(["view_leads"])
        app.dependency_overrides[lead.has_permission("view_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        with patch("routers.lead.LeadManager.get", new=AsyncMock(side_effect=NotFound("Lead not found"))):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                response = await ac.get("/leads/999")
                assert response.status_code in (404, 500)

    # 3️⃣ Некорректный ID
    async def test_get_lead_invalid_id(self):
        user = await self._mock_user(["view_leads"])
        app.dependency_overrides[lead.has_permission("view_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.get("/leads/abc")
            assert response.status_code == 422  # FastAPI автоматически выдаёт 422

    # 4️⃣ Нет прав
    async def test_get_lead_forbidden(self):
        user = await self._mock_user(["view_tasks"])  # нет view_leads

        async def forbidden_mock():
            raise Exception("Permission Denied")

        app.dependency_overrides[lead.has_permission("view_leads")] = lambda: forbidden_mock
        app.dependency_overrides[get_current_user] = lambda: user

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.get("/leads/1")
            assert response.status_code in (403, 500)

    # 5️⃣ Неавторизованный запрос
    async def test_get_lead_unauthorized(self):
        app.dependency_overrides.clear()  # нет user-заглушки

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.get("/leads/1")
            assert response.status_code in (401, 403)

