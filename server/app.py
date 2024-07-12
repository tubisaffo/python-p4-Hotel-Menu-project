#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from datetime import datetime
from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.exceptions import NotFound
from flask_cors import CORS

from models import MenuItem, Order, db, User

# Initialize the flask application
app = Flask(__name__)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app) # Allow requests from all origins

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Add your model imports


# Views go here!


@app.route('/')
def index ():
    
    return 'FUCK YOU RUTO!!!'
@app.route('/users', methods=['GET', 'POST'])
def get_users():
    users = User.query.all()
    return [user.to_dict(rules=['-orders']) for user in users]


@app.route('/menu', methods=['GET', 'POST', 'DELETE'])
def handle_menu_items():
    if request.method == 'GET':
        menu_items = MenuItem.query.all()
        return jsonify([item.to_dict() for item in menu_items])
    
    elif request.method == 'POST':
        data = request.json
        if not data or 'name' not in data or 'price' not in data:
            return jsonify({"error": "Invalid data. 'name' and 'price' are required."}), 400
        
        new_menu_item = MenuItem(
            name=data['name'],
            price=data['price'],
            description=data.get('description')
        )

        db.session.add(new_menu_item)
        db.session.commit()

        return jsonify({"message": "Menu item created successfully.", "menu_item": new_menu_item.to_dict()}), 201

@app.route('/menu/<int:id>', methods=['GET', 'DELETE'])
def handle_menu_item(id):
    menu_item = MenuItem.query.filter_by(id=id).first()
    if not menu_item:
        raise NotFound("Menu item not found")
    
    if request.method == 'GET':
        return jsonify(menu_item.to_dict())
    
    elif request.method == 'DELETE':
        db.session.delete(menu_item)
        db.session.commit()
        return jsonify({"message": "Menu item deleted successfully"})

@app.route('/orders', methods=['GET', 'POST'])
def manage_orders():
    if request.method == 'POST':
        data = request.get_json()
        new_order = Order(user_id=data['user_id'], menu_item_id=data['menu_item_id'], quantity=data['quantity'])
        db.session.add(new_order)
        db.session.commit()
        return jsonify({"message": "Order placed successfully"}), 201
    orders = Order.query.all()
    return jsonify([{"id": order.id, "user_id": order.user_id, "menu_item_id": order.menu_item_id, "quantity": order.quantity, "order_date": order.order_date} for order in orders])

    
    
        
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
