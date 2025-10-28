import uuid
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from main import app
from models.user import User
from dependencies import get_current_user


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest_asyncio.fixture
def fake_user():
    return User(
        id=1,
        full_name="Test User",
        username="test_user",
        hashed_password="hashed",
        is_superuser=False
    )


# ----------------------------------------------------------------
# CREATE LEAD
# ----------------------------------------------------------------
@pytest.mark.asyncio
async def test_create_lead_success(client: AsyncClient, monkeypatch, fake_user):
    """Создание лида"""

    async def fake_create_lead(self, request, target_id):
        return {
            "id": 1,
            "full_name": request.full_name,
            "email": request.email,
            "phone": request.phone,
            "company_name": request.company_name,
            "company_info": request.company_info,
            "status": "new",
            "target_id": target_id
        }

    monkeypatch.setattr("services.lead_manager.LeadManager.create_lead", fake_create_lead)

    response = await client.post(
        "/leads/",
        json={
            "full_name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "company_name": "ACME Inc.",
            "company_info": "Some info"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["full_name"] == "John Doe"


# ----------------------------------------------------------------
# LIST LEADS
# ----------------------------------------------------------------
@pytest.mark.asyncio
async def test_list_leads_success(client: AsyncClient, monkeypatch, fake_user):
    """Получение списка лидов"""

    async def fake_get_leads(self, **kwargs):
        return {
            "data": [
                {
                    "id": 1,
                    "full_name": "John Doe",
                    "email": "john@example.com",
                    "phone": "123456",
                    "company_name": "ACME Inc.",
                    "company_info": "Info",
                    "status": "new",
                    "target_id": None
                }
            ],
            "pagination": {
                "page": 1,
                "size": 10,
                "total": 1,
                "total_pages": 1,
                "has_next": False,
                "has_prev": False
            }
        }

    async def fake_current_user():
        return fake_user

    app.dependency_overrides[get_current_user] = fake_current_user
    monkeypatch.setattr("services.lead_manager.LeadManager.get_leads", fake_get_leads)

    response = await client.get("/leads/")
    print(response.json())
    assert response.status_code == 200
    assert response.json()["data"][0]["status"] == "new"
    app.dependency_overrides.clear()


# ----------------------------------------------------------------
# GET LEAD
# ----------------------------------------------------------------
@pytest.mark.asyncio
async def test_get_lead_success(client: AsyncClient, monkeypatch, fake_user):
    """Получение одного лида"""

    async def fake_get_lead(self, lead_id):
        return {
            "id": lead_id,
            "full_name": "John Doe",
            "email": "john@example.com",
            "phone": "123456",
            "company_name": "ACME Inc.",
            "company_info": "Info",
            "status": "new",
            "target_id": None
        }

    async def fake_current_user():
        return fake_user

    app.dependency_overrides[get_current_user] = fake_current_user
    monkeypatch.setattr("services.lead_manager.LeadManager.get_lead", fake_get_lead)

    response = await client.get("/leads/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1
    app.dependency_overrides.clear()


# ----------------------------------------------------------------
# UPDATE LEAD
# ----------------------------------------------------------------
@pytest.mark.asyncio
async def test_update_lead_success(client: AsyncClient, monkeypatch, fake_user):
    """Обновление лида"""

    async def fake_update_lead(self, lead_id, request, user):
        return None

    async def fake_current_user():
        return fake_user

    app.dependency_overrides[get_current_user] = fake_current_user
    monkeypatch.setattr("services.lead_manager.LeadManager.update_lead", fake_update_lead)

    response = await client.put(
        "/leads/1",
        json={
            "full_name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "123456",
            "company_name": "ACME Ltd.",
            "company_info": "Updated info",
            "status": "new"
        }
    )
    assert response.status_code == 204
    app.dependency_overrides.clear()


# ----------------------------------------------------------------
# COMMENTS — CREATE, GET, LIST, UPDATE, DELETE
# ----------------------------------------------------------------
@pytest.mark.asyncio
async def test_create_lead_comment(client: AsyncClient, monkeypatch, fake_user):
    """Создание комментария"""

    async def fake_add_comment(self, lead_id, user_id, request):
        return {
            "id": 1,
            "lead_id": lead_id,
            "user_id": user_id,
            "comment": request.comment
        }

    async def fake_current_user():
        return fake_user

    app.dependency_overrides[get_current_user] = fake_current_user
    monkeypatch.setattr("services.lead_manager.LeadManager.add_comment", fake_add_comment)

    response = await client.post(
        "/leads/1/comments/",
        json={"lead_id": 1, "comment": "Good lead!"}
    )
    assert response.status_code == 201
    assert response.json()["comment"] == "Good lead!"
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_get_lead_comments(client: AsyncClient, monkeypatch, fake_user):
    """Получение списка комментариев"""

    async def fake_get_comments(self, lead_id, sort_by):
        return {
            "data": [
                {"id": 1, "lead_id": lead_id, "user_id": 1, "comment": "Comment 1"}
            ],
            "pagination": {
                "page": 1,
                "size": 10,
                "total": 1,
                "total_pages": 1,
                "has_next": False,
                "has_prev": False
            }
        }

    async def fake_current_user():
        return fake_user

    app.dependency_overrides[get_current_user] = fake_current_user
    monkeypatch.setattr("services.lead_manager.LeadManager.get_comments", fake_get_comments)

    response = await client.get("/leads/1/comments/")
    assert response.status_code == 200
    assert response.json()["data"][0]["comment"] == "Comment 1"
    app.dependency_overrides.clear()
