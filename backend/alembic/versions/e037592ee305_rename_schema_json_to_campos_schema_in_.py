"""rename schema_json to campos_schema in plantillas

Revision ID: e037592ee305
Revises: 4f53c2fb4478
Create Date: 2026-03-26 02:50:12.147063

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e037592ee305'
down_revision: Union[str, None] = '4f53c2fb4478'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Rename column schema_json to campos_schema in table plantillas
    op.alter_column('plantillas', 'schema_json', new_column_name='campos_schema')


def downgrade() -> None:
    # Rename back campos_schema to schema_json
    op.alter_column('plantillas', 'campos_schema', new_column_name='schema_json')
