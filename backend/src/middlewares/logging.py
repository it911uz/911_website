import json
import logging
import time
import traceback
import uuid

from datetime import datetime

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response

logger = logging.getLogger("fastapi-logger")
logger.setLevel(logging.INFO)

# Обработчик, который пишет в stdout (Promtail может собирать stdout)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(message)s')  # JSON форматируем вручную
handler.setFormatter(formatter)
logger.addHandler(handler)


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(
            self,
            request: Request,
            call_next: RequestResponseEndpoint
    ) -> Response:
        access_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        start_time = time.time()
        trace_id = str(uuid.uuid4())
        try:
            response = await call_next(request)
            status_code = response.status_code
            error = None
        except Exception as e:
            status_code = 500
            error = {
                "type": e.__class__.__name__,
                "message": str(e),
                "traceback": traceback.format_exc()
            }
            response = Response(
                content=json.dumps({"detail": "Internal Server Error", "trace_id": trace_id}),
                media_type="application/json",
                status_code=500
            )
        process_time = (time.time() - start_time) * 1000

        log_data = {
            "access_time": access_time,
            "trace_id": trace_id,
            "method": request.method,
            "path": request.url.path,
            "status_code": status_code,
            "client_ip": request.client.host,
            "process_time_ms": round(process_time, 2),
            "user_agent": request.headers.get("user-agent"),
            "error": error,
        }

        if error:
            log_data["error"] = error
            logger.error(json.dumps(log_data, ensure_ascii=False))
        else:
            logger.info(json.dumps(log_data, ensure_ascii=False))

        return response
