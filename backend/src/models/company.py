from sqlalchemy import Column, Integer, String, ForeignKey

from models.base import Base
from models.mixins import TimeStampMixin


class Company(Base, TimeStampMixin):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    info = Column(String(1024))


class CompanyComment(Base, TimeStampMixin):
    __tablename__ = 'company_comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(Integer, ForeignKey('companies.id', ondelete='CASCADE'))
    comment = Column(String(1024))
