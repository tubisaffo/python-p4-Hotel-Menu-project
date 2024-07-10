from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.exceptions import NotFound
from flask_cors import CORS

from models import db, User, Order, MenuItem

# Initialize the flask application
app = Flask(__name__)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app) # Allow requests from all origins

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/menu_items', methods=['POST'])
def add_menu_item():
    data = request.json
    new_item = MenuItem(name=data['name'], description=data['description'], price=data['price'], created_by=data['created_by'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Menu item added successfully'}), 201

@app.route('/menu_items/<int:id>', methods=['PUT'])
def update_menu_item(id):
    data = request.json
    item = MenuItem.query.get(id)
    item.name = data['name']
    item.description = data['description']
    item.price = data['price']
    db.session.commit()
    return jsonify({'message': 'Menu item updated successfully'}), 200

@app.route('/menu_items/<int:id>', methods=['DELETE'])
def delete_menu_item(id):
    item = MenuItem.query.get(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Menu item deleted successfully'}), 200

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    orders_list = [{'id': order.id, 'user_id': order.user_id, 'order_date': order.order_date} for order in orders]
    return jsonify(orders_list), 200

if __name__ == '__main__':
    app.run(debug=True)
