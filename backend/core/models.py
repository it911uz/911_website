from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    def as_dict(self, include_relationships: bool = False) -> dict:
        """Возвращает словарь всех полей модели"""
        data = {c.name: getattr(self, c.name) for c in self.__table__.columns}

        if include_relationships:
            for rel in self.__mapper__.relationships:
                val = getattr(self, rel.key)
                if val is None:
                    data[rel.key] = None
                elif isinstance(val, list):
                    data[rel.key] = [v.as_dict() for v in val]
                else:
                    data[rel.key] = val.as_dict()
        return data
