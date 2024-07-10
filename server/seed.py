from app import app
from models import db, User, MenuItem, Order, OrderItem

with app.app_context():
    db.create_all()