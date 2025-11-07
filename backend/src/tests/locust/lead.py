from locust import HttpUser, task, between
import random

BASE_URL = "http://localhost:8000"  # 👈 замени при необходимости

USERS = [
    {"username": "admin", "password": "1234", "role": "superuser"},
    {"username": "manager", "password": "Xuylo@1234", "role": "manager"},
    {"username": "simple", "password": "Xuylo@1234", "role": "simple"},
]


class LeadUser(HttpUser):
    host = BASE_URL
    wait_time = between(1, 3)

    def on_start(self):
        """Авторизация"""
        user = random.choice(USERS)
        self.username = user["username"]
        self.role = user["role"]

        res = self.client.post(
            "/auth/token",
            data={"username": user["username"], "password": user["password"]},
        )
        if res.status_code in (200, 201):
            token = res.json().get("access_token")
            self.headers = {"Authorization": f"Bearer {token}"}
            print(f"[+] {self.username} logged in.")
        else:
            self.headers = {}
            print(f"[x] Login failed for {self.username}: {res.status_code}")

    # ===== LEADS API =====

    @task(3)
    def list_leads(self):
        with self.client.get(
            "/leads/",
            headers=self.headers,
            name="GET /leads/",
            catch_response=True,
        ) as res:
            if res.status_code == 200:
                res.success()
            else:
                res.failure(f"Failed: {res.status_code}")

    @task(2)
    def create_lead(self):
        if self.role not in ["superuser", "manager"]:
            return
        data = {
            "full_name": f"Test Lead {random.randint(1000,9999)}",
            "email": f"lead{random.randint(1000,9999)}@mail.com",
            "phone": "+998900000000",
            "company_name": "Test Company",
            "company_info": "Locust Load Test",
        }
        with self.client.post(
            "/leads/",
            json=data,
            headers=self.headers,
            name="POST /leads/",
            catch_response=True,
        ) as res:
            if res.status_code in (201, 422):
                res.success()
            else:
                res.failure(f"Failed: {res.status_code}")

    @task(1)
    def update_lead(self):
        if self.role not in ["superuser", "manager"]:
            return
        lead_id = random.randint(1, 5)
        data = {
            "full_name": "Updated Lead",
            "email": "updated@mail.com",
            "phone": "+998911234567",
            "company_name": "Updated Company",
            "company_info": "Updated Info",
            "status_id": 1,
        }
        with self.client.put(
            f"/leads/{lead_id}",
            json=data,
            headers=self.headers,
            name="PUT /leads/{id}",
            catch_response=True,
        ) as res:
            if res.status_code in (204, 404):
                res.success()
            else:
                res.failure(f"Failed: {res.status_code}")

    @task(1)
    def delete_lead(self):
        if self.role != "superuser":
            return
        lead_id = random.randint(1, 5)
        with self.client.delete(
            f"/leads/{lead_id}",
            headers=self.headers,
            name="DELETE /leads/{id}",
            catch_response=True,
        ) as res:
            if res.status_code in (204, 404):
                res.success()
            else:
                res.failure(f"Failed: {res.status_code}")

    @task(1)
    def move_lead(self):
        if self.role not in ["superuser", "manager"]:
            return
        data = {"lead_id": random.randint(1, 5), "status_id": random.randint(1, 3)}
        with self.client.post(
            "/leads/move",
            json=data,
            headers=self.headers,
            name="POST /leads/move",
            catch_response=True,
        ) as res:
            if res.status_code in (201, 404):
                res.success()
            else:
                res.failure(f"Failed: {res.status_code}")
