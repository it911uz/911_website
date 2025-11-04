from locust import HttpUser, task, between
from faker import Faker
import random

fake = Faker("ru_RU")  # Можно "en_US" если нужны английские имена и компании

class LeadLoadTest(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        """Если нужно — добавить авторизацию"""
        response = self.client.post("auth/token", json={"username": "admin", "password": "1234"})
        self.token = response.json().get("access_token")
        self.headers = {"Authorization": f"Bearer {self.token}", "Content-Type": "application/json"}


    @task(3)
    def create_lead(self):
        """Создание нового лида с рандомными данными"""
        data = {
            "full_name": fake.name(),
            "email": fake.unique.email(),
            "phone": fake.phone_number(),
            "company_name": fake.company(),
            "company_info": fake.text(max_nb_chars=300)
        }

        with self.client.post("/leads/", json=data, headers=self.headers, catch_response=True) as response:
            if response.status_code == 201:
                response.success()
            else:
                response.failure(f"Unexpected status: {response.status_code}")

    @task(1)
    def get_leads(self):
        """Получение списка лидов"""
        self.client.get("/leads/", headers=self.headers)

    @task(1)
    def update_lead(self):
        """Обновление случайного лида (если API поддерживает PUT/PATCH)"""
        lead_id = random.randint(1, 100)  # для теста, можно заменить на реальный ID
        data = {
            "full_name": fake.name(),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "company_name": fake.company(),
            "company_info": fake.text(max_nb_chars=200)
        }

        self.client.put(f"/leads/{lead_id}", json=data, headers=self.headers)

    @task(1)
    def delete_lead(self):
        """Удаление случайного лида (если разрешено)"""
        lead_id = random.randint(1, 100)
        self.client.delete(f"/leads/{lead_id}", headers=self.headers)
