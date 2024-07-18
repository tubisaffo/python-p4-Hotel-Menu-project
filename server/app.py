from datetime import datetime
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.exceptions import NotFound
from flask_cors import CORS

from models import MenuItem, Order, OrderItem, db  # Import only necessary models and db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)  # Allow requests from all origins

db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)

# Views go here

@app.route('/')
def index():
    return 'Welcome to your Flask App!'

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

@app.route('/cart_items', methods=['GET'])
def get_cart_items():
    # Assuming you have a way to identify the current session_id or user_id
    user_id = request.args.get('user_id')  # Adjust based on how you manage sessions
    
    # Example query to fetch order items associated with a session_id
    cart_items = OrderItem.query.filter_by(session_id=user_id).all()
    
    return jsonify([item.to_dict() for item in cart_items])

@app.route('/order_items', methods=['POST'])
def add_order_item():
    data = request.get_json()

    # Ensure all required fields are provided in the request
    if 'order_id' not in data or 'menu_item_id' not in data or 'menuitem_name' not in data or 'menuitem_price' not in data:
        return jsonify({"error": "Invalid data. 'order_id', 'menu_item_id', 'menuitem_name', and 'menuitem_price' are required."}), 400

    new_order_item = OrderItem(
        order_id=data['order_id'],
        menu_item_id=data['menu_item_id'],
        menuitem_name=data['menuitem_name'],
        menuitem_price=data['menuitem_price'],
        menu_item_image=data.get('menu_item_image'),
        quantity=data.get('quantity', 1)  # Default quantity to 1 if not provided
    )

    db.session.add(new_order_item)
    db.session.commit()

    return jsonify({"message": "Order item added successfully", "order_item": new_order_item.to_dict()}), 201

@app.route('/order_items/<int:id>', methods=['DELETE'])
def delete_order_item(id):
    order_item = OrderItem.query.get(id)
    if not order_item:
        raise NotFound("Order item not found")
    
    db.session.delete(order_item)
    db.session.commit()
    return jsonify({"message": "Order item deleted successfully"})

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

if __name__ == '__main__':
    app.run(port=5555, debug=True)
