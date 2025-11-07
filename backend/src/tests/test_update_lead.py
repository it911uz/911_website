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
class TestLeadUpdate:

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

    # 1️⃣ Успешное полное обновление (PUT)
    async def test_update_lead_success(self):
        user = await self._mock_user(["update_leads"])
        app.dependency_overrides[lead.has_permission("update_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        with patch("routers.lead.LeadManager.update", new=AsyncMock(return_value=None)):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                body = {
                    "full_name": "Updated Name",
                    "email": "new@example.com",
                    "phone": "+998901234567",
                    "company_name": "Updated Corp",
                    "company_info": "Updated info",
                    "target_id": None,
                    "status_id": 1
                }
                response = await ac.put("/leads/1", json=body)
                assert response.status_code == 204

    # 2️⃣ Успешное частичное обновление (PATCH)
    async def test_partial_update_lead_success(self):
        user = await self._mock_user(["update_leads"])
        app.dependency_overrides[lead.has_permission("update_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        with patch("routers.lead.LeadManager.update", new=AsyncMock(return_value=None)):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                body = {"status_id": 2}
                response = await ac.patch("/leads/1", json=body)
                assert response.status_code == 204

    # 3️⃣ Лид не найден
    async def test_update_lead_not_found(self):
        user = await self._mock_user(["update_leads"])
        app.dependency_overrides[lead.has_permission("update_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        with patch("routers.lead.LeadManager.update", new=AsyncMock(side_effect=NotFound("Lead not found"))):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                body = {
                    "full_name": "Updated Name",
                    "email": "new@example.com",
                    "phone": "+998901234567",
                    "company_name": "Updated Corp",
                    "company_info": "Updated info",
                    "target_id": None,
                    "status_id": 1
                }
                response = await ac.put("/leads/999", json=body)
                assert response.status_code == 404

    # 4️⃣ Без прав на обновление
    async def test_update_lead_forbidden(self):
        user = await self._mock_user(["view_leads"])  # нет update_leads

        async def forbidden_mock():
            raise Exception("Permission Denied")

        app.dependency_overrides[lead.has_permission("update_leads")] = lambda: forbidden_mock
        app.dependency_overrides[get_current_user] = lambda: user

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            body = {
                "full_name": "Updated Name",
                "email": "new@example.com",
                "phone": "+998901234567",
                "company_name": "Updated Corp",
                "company_info": "Updated info",
                "target_id": None,
                "status_id": 1
            }
            response = await ac.put("/leads/1", json=body)
            assert response.status_code in (403, 500)

    # 5️⃣ Неверный ID
    async def test_update_lead_invalid_id(self):
        user = await self._mock_user(["update_leads"])
        app.dependency_overrides[lead.has_permission("update_leads")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            body = {
                "full_name": "Updated Name",
                "email": "new@example.com",
                "phone": "+998901234567",
                "company_name": "Updated Corp",
                "company_info": "Updated info",
                "target_id": None,
                "status_id": 1
            }
            response = await ac.put("/leads/abc", json=body)
            assert response.status_code == 422  # FastAPI автоматически отдаёт 422

    # 7️⃣ Без авторизации
    async def test_update_lead_unauthorized(self):
        app.dependency_overrides.clear()

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.put("/leads/1", json={"full_name": "Test"})
            assert response.status_code in (401, 403)
