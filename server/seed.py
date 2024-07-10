from config import db
from models import User, MenuItem

db.create_all()

admin = User(username='admin', password='admin', role='admin')
staff = User(username='staff', password='staff', role='staff')
db.session.add(admin)
db.session.add(staff)
db.session.commit()
