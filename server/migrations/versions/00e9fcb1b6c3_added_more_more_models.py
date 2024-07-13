"""added more more models

Revision ID: 00e9fcb1b6c3
Revises: 4015248fbc9c
Create Date: 2024-07-11 09:56:55.554975

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '00e9fcb1b6c3'
down_revision = '4015248fbc9c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('menu_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('price', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('menu_item_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('order_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['menu_item_id'], ['menu_items.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('orders')
    op.drop_table('menu_items')
    # ### end Alembic commands ###