from models.lead import Lead, LeadComment
from repository.base_repo import BaseRepository


class LeadRepository(BaseRepository[Lead]):
    pass


class LeadCommentRepository(BaseRepository[LeadComment]):
    pass
