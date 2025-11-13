from routers.company.base import router
from routers.company.contact import router as contact_router
from routers.company.subscription import router as subscription_router

router.include_router(contact_router)
router.include_router(subscription_router)

__all__ = [
    'router',
]
