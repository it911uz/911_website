from company.routers.base import router
from company.routers.comment import router as comment_router
from company.routers.contact import router as contact_router
from company.routers.subscription import router as subscription_router
from company.routers.payment import router as payment_router
router.include_router(comment_router)
router.include_router(contact_router)
subscription_router.include_router(payment_router)
router.include_router(subscription_router)

__all__ = [
    'router',
]
