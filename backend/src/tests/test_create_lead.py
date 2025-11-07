import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import AsyncMock, patch

from main import app  # если у тебя точка входа FastAPI в main.py
from schemas.lead import LeadRead


@pytest.mark.anyio
class TestLeadCreate:
    async def test_create_lead_success(self):
        """✅ Успешное создание лида"""
        mock_lead = LeadRead(
            id=1,
            full_name="Иван Иванов",
            email="ivan@example.com",
            phone="+998901234567",
            company_name="TestCorp",
            company_info="IT Company",
            target_id=None,
            status_id=None,
            comments=[],
            status=None
        )

        with patch("routers.lead.LeadManager.create", new=AsyncMock(return_value=mock_lead)):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                payload = {
                    "full_name": "Иван Иванов",
                    "email": "ivan@example.com",
                    "phone": "+998901234567",
                    "company_name": "TestCorp",
                    "company_info": "IT Company"
                }
                response = await ac.post("/leads/", json=payload)

        assert response.status_code == 201
        data = response.json()
        assert data["full_name"] == "Иван Иванов"
        assert data["email"] == "ivan@example.com"
        assert data["comments"] == []

    async def test_create_lead_invalid_email(self):
        """❌ Ошибка 422: Неверный email"""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            payload = {
                "full_name": "Иван Иванов",
                "email": "not-an-email",
                "phone": "+998901234567",
                "company_name": "TestCorp",
                "company_info": "IT Company"
            }
            response = await ac.post("/leads/", json=payload)

        assert response.status_code == 422
        assert "email" in response.text

    async def test_create_lead_not_found(self):
        """⚠️ LeadManager.create выбрасывает NotFound"""
        from exceptions import NotFound

        with patch("routers.lead.LeadManager.create", new=AsyncMock(side_effect=NotFound("Lead not found"))):
            transport = ASGITransport(app=app)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                payload = {
                    "full_name": "Иван Иванов",
                    "email": "ivan@example.com",
                    "phone": "+998901234567",
                    "company_name": "TestCorp",
                    "company_info": "IT Company"
                }
                response = await ac.post("/leads/", json=payload)

        assert response.status_code == 404
        assert "Lead not found" in response.text


