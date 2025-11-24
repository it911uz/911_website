from task.routers.task import router
from task.routers.comment import router as comment_router
from task.routers.file import router as file_router
from task.routers.task_status import router as task_status_router

router.include_router(comment_router)
router.include_router(file_router)
