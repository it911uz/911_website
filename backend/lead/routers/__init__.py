from lead.routers.base import router
from lead.routers.lead_comment import router as lead_comment_router
from lead.routers.lead_files import router as lead_files_router
from lead.routers.lead_status import router as lead_status_router

router.include_router(lead_comment_router)
router.include_router(lead_files_router)

__all__ = [router, lead_status_router]
