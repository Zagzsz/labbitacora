import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Text, DateTime, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Medicion(Base):
    __tablename__ = "mediciones"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    practica_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("practicas.id"), nullable=False
    )
    nombre_variable: Mapped[str] = mapped_column(String, nullable=False)
    unidad: Mapped[str] = mapped_column(String, nullable=False)
    valores = mapped_column(ARRAY(Float), nullable=False)
    timestamps = mapped_column(ARRAY(Float), nullable=True)
    notas: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    practica = relationship("Practica", back_populates="mediciones")
