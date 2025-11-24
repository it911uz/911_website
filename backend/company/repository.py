from company.models import Company, CompanyComment, CompanyContact, Subscription, Payment
from core.repository import BaseRepository


class CompanyRepository(BaseRepository):
    model = Company


class CompanyCommentRepository(BaseRepository):
    model = CompanyComment


class CompanyContactRepository(BaseRepository):
    model = CompanyContact

class CompanySubscriptionRepository(BaseRepository):
    model = Subscription

class PaymentRepository(BaseRepository):
    model = Payment