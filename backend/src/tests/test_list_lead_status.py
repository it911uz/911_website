import pytest
from unittest.mock import AsyncMock, patch
from httpx import AsyncClient, ASGITransport

from main import app
from routers import lead_status
from dependencies import get_current_user
from schemas.user import UserRead
from schemas.role import RoleRead
from schemas.lead import LeadStatusRead


@pytest.mark.anyio
class TestLeadStatusList:

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

    # 1️⃣ Успешное получение списка статусов
    async def test_list_lead_statuses_success(self):
        user = await self._mock_user(["view_lead_statuses"])
        app.dependency_overrides[lead_status.has_permission("view_lead_statuses")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user

        fake_data = {
            "items":
                [
                    LeadStatusRead(id=1, name="New", hex="#FF0000", level=1, can_delete=True, can_edit=True),
                    LeadStatusRead(id=2, name="In Progress", hex="#00FF00", level=2, can_delete=True, can_edit=True)
                ],
            "page": 1,
            "pages": 1,
            "total": 2,
            "size": 50
        }

        with patch("routers.lead_status.LeadStatusManager.list", new=AsyncMock(return_value=fake_data)):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                response = await ac.get("/lead-statuses/")
                assert response.status_code == 200
                assert len(response.json()["items"]) == 2
                assert response.json()["items"][0]["name"] == "New"

    # 2️⃣ Пустой список
    async def test_list_lead_statuses_empty(self):
        user = await self._mock_user(["view_lead_statuses"])
        app.dependency_overrides[lead_status.has_permission("view_lead_statuses")] = lambda: None
        app.dependency_overrides[get_current_user] = lambda: user
        fake_data = {
            "items":
                [
                ],
            "page": 1,
            "pages": 1,
            "total": 2,
            "size": 50
        }
        with patch("routers.lead_status.LeadStatusManager.list", new=AsyncMock(return_value=fake_data)):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                response = await ac.get("/lead-statuses/")
                assert response.status_code == 200
                assert response.json()["items"] == []

    # 3️⃣ Нет прав
    async def test_list_lead_statuses_forbidden(self):
        user = await self._mock_user(["view_leads"])  # нет view_lead_statuses

        async def forbidden_mock():
            raise Exception("Permission Denied")

        app.dependency_overrides[lead_status.has_permission("view_lead_statuses")] = lambda: forbidden_mock
        app.dependency_overrides[get_current_user] = lambda: user

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.get("/lead-statuses/")
            assert response.status_code in (403, 500)

    # 5️⃣ Неавторизованный пользователь
    async def test_list_lead_statuses_unauthorized(self):
        app.dependency_overrides.clear()

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.get("/lead-statuses/")
            assert response.status_code in (401, 403)
