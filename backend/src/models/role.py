from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship

from models.base import Base
from models.mixins import TimeStampMixin

role_permission = Table(
    'role_permissions',
    Base.metadata,
    Column("role_id", Integer, ForeignKey('roles.id'), primary_key=True),
    Column("permission_id", Integer, ForeignKey('permissions.id'), primary_key=True)
)


class Role(Base, TimeStampMixin):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), unique=True)

    permissions = relationship(
        "Permission",
        secondary=role_permission,
        back_populates="roles",
        lazy="selectin"
    )
    users = relationship(
        "User",
        back_populates="role",
        lazy="selectin"
    )


class Permission(Base, TimeStampMixin):
    __tablename__ = "permissions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(512), unique=True)
    codename = Column(String(255), unique=True)

    roles = relationship(
        "Role",
        secondary=role_permission,
        back_populates="permissions",
        lazy="selectin"
    )
