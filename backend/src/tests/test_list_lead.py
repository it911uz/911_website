import pytest
from unittest.mock import AsyncMock, patch
from httpx import AsyncClient, ASGITransport
from fastapi import status
from datetime import datetime

from main import app
from schemas.lead import LeadRead
from dependencies import get_current_user, has_permission
from routers import lead
from schemas.role import RoleRead
from schemas.user import UserRead


@pytest.mark.anyio
class TestLeadList:
    """Полный набор тестов для GET /leads/"""

    # -------------------------------
    # Вспомогательные методы
    # -------------------------------
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

    def _mock_leads_page(self):
        """Создает тестовую страницу лидов"""
        leads = [
            LeadRead(
                id=1,
                full_name="Иван Иванов",
                email="ivan@example.com",
                phone="+998901234567",
                company_name="TestCorp",
                company_info="IT Company",
                target_id=None,
                status_id=1,
                comments=[],
                status=None,
            ),
            LeadRead(
                id=2,
                full_name="Петр Петров",
                email="petr@example.com",
                phone="+998908887766",
                company_name="DevStudio",
                company_info="Software House",
                target_id=None,
                status_id=2,
                comments=[],
                status=None,
            ),
        ]
        return {"items": [l.model_dump() for l in leads], "total": 2, "page": 1, "size": 50, "pages": 1}

    # -------------------------------
    # 1️⃣ Успешное получение списка лидов
    # -------------------------------
    async def test_list_leads_success(self):
        user = await self._mock_user(["view_leads"])

        app.dependency_overrides[get_current_user] = lambda: user
        app.dependency_overrides[has_permission("view_leads")] = lambda: None

        with patch("routers.lead.LeadManager.list", new=AsyncMock(return_value=self._mock_leads_page())):
            async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
                response = await ac.get("/leads/")
                assert response.status_code == status.HTTP_200_OK
                data = response.json()
                assert data["total"] == 2
                assert data["items"][0]["full_name"] == "Иван Иванов"

        app.dependency_overrides.clear()

    # -------------------------------
    # 2️⃣ Пагинация и фильтрация
    # -------------------------------
    async def test_list_leads_with_filters_and_pagination(self):
        user = await self._mock_user(["view_leads"])
        app.dependency_overrides[get_current_user] = lambda: user
        app.dependency_overrides[has_permission("view_leads")] = lambda: None

        filters = {
            "created_at__gte": datetime(2024, 1, 1).isoformat(),
            "status_id__in": "1,2",
            "order_by": "created_at",
            "page": 1,
            "size": 10,
        }

        mock_result = self._mock_leads_page()
        with patch("routers.lead.LeadManager.list", new=AsyncMock(return_value=mock_result)) as mock_list:
            async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
                response = await ac.get("/leads/", params=filters)
                assert response.status_code == 200
                data = response.json()
                assert data["total"] == 2
                mock_list.assert_awaited_once()

        app.dependency_overrides.clear()

    # -------------------------------
    # 3️⃣ Ошибка 400 — неверные фильтры
    # -------------------------------
    async def test_list_leads_invalid_filter(self):
        user = await self._mock_user(["view_leads"])
        app.dependency_overrides[get_current_user] = lambda: user
        app.dependency_overrides[has_permission("view_leads")] = lambda: None

        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
            response = await ac.get("/leads/?created_at__gte=invalid-date")
            assert response.status_code in (400, 422)

        app.dependency_overrides.clear()

    # -------------------------------
    # 4️⃣ Ошибка 401 — без токена
    # -------------------------------
    async def test_list_leads_unauthorized(self):
        app.dependency_overrides.clear()
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
            response = await ac.get("/leads/")
            assert response.status_code == status.HTTP_401_UNAUTHORIZED

    # -------------------------------
    # 5️⃣ Ошибка 403 — нет разрешения
    # -------------------------------
    async def test_list_leads_forbidden(self):
        user = await self._mock_user(["view_tasks"])  # нет view_leads
        app.dependency_overrides[get_current_user] = lambda: user

        async def deny_permission():
            raise Exception("Permission Denied")

        app.dependency_overrides[has_permission("view_leads")] = deny_permission

        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
            response = await ac.get("/leads/")
            assert response.status_code in (403, 401)

        app.dependency_overrides.clear()


    # -------------------------------
    # 7️⃣ Пустой список лидов
    # -------------------------------
    async def test_list_leads_empty(self):
        user = await self._mock_user(["view_leads"])
        app.dependency_overrides[get_current_user] = lambda: user
        app.dependency_overrides[has_permission("view_leads")] = lambda: None

        empty_page = {"items": [], "total": 0, "page": 1, "size": 50, "pages": 0}
        with patch("routers.lead.LeadManager.list", new=AsyncMock(return_value=empty_page)):
            async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
                response = await ac.get("/leads/")
                assert response.status_code == 200
                data = response.json()
                assert data["total"] == 0
                assert data["items"] == []

        app.dependency_overrides.clear()

    # -------------------------------
    # 8️⃣ Пользователь — суперюзер (обходит права)
    # -------------------------------
    async def test_list_leads_superuser(self):
        user = await self._mock_user([], superuser=True)
        app.dependency_overrides[get_current_user] = lambda: user
        # даже без has_permission
        app.dependency_overrides[has_permission("view_leads")] = lambda: None

        with patch("routers.lead.LeadManager.list", new=AsyncMock(return_value=self._mock_leads_page())):
            async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
                response = await ac.get("/leads/")
                assert response.status_code == 200

        app.dependency_overrides.clear()
