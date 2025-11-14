from routers.company.base import router
from routers.company.comment import router as comment_router
from routers.company.contact import router as contact_router
from routers.company.subscription import router as subscription_router
# from routers.company.payment import router as payment_router
router.include_router(comment_router)
router.include_router(contact_router)
router.include_router(subscription_router)

__all__ = [
    'router',
]
