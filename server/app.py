from flask import Flask, request, jsonify
from config import app, db
from models import User, MenuItem, Order

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        return jsonify({'token': 'fake-token', 'user': {'id': user.id, 'username': user.username, 'role': user.role}})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/menu_items', methods=['GET', 'POST'])
def menu_items():
    if request.method == 'POST':
        data = request.get_json()
        new_item = MenuItem(name=data['name'], description=data['description'], price=data['price'])
        db.session.add(new_item)
        db.session.commit()
        return jsonify({'message': 'Menu item created'}), 201
    items = MenuItem.query.all()
    return jsonify([item._dict_ for item in items]), 200

@app.route('/orders', methods=['GET', 'POST'])
def orders():
    if request.method == 'POST':
        data = request.get_json()
        new_order = Order(user_id=data['user_id'], menu_item_id=data['menu_item_id'], quantity=data['quantity'])
        db.session.add(new_order)
        db.session.commit()
        return jsonify({'message': 'Order created'}), 201
    orders = Order.query.all()
    return jsonify([order._dict_ for order in orders]), 200

if _name_ == '_main_':
    app.run(debug=True)

