from sqlalchemy import Integer, Column, String, Numeric, Boolean

from models.base import Base


class Service(Base):
    __tablename__ = 'services'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(String(1024), nullable=False)
    price = Column(Numeric(precision=20, scale=2), nullable=False)
    is_subscription = Column(Boolean, nullable=False, default=False)
