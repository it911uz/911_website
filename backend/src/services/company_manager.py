from models.company import Company, CompanyContact, Subscription, CompanyComment
from services.base_manager import BaseManager


class CompanyManager(BaseManager[Company]):
    pass


class CompanyContactManager(BaseManager[CompanyContact]):
    pass


class CompanySubscriptionManager(BaseManager[Subscription]):
    pass


class CompanyCommentManager(BaseManager[CompanyComment]):
    pass
