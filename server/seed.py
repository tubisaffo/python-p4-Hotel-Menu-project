
#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports

from faker import Faker
from app import app
from models import db, User, MenuItem, Order
from datetime import datetime

with app.app_context():
    fake = Faker()

    # Delete all records/rows in the tables
    print("Deleting data...")
    User.query.delete()
    MenuItem.query.delete()
    Order.query.delete()

    print("Creating users...")
    users = []
    for _ in range(10):
        username = fake.user_name()
        email = fake.email()
        password = fake.password()
        role = fake.random_element(elements=('user', 'admin'))
        users.append(User(username=username, email=email, password=password, role=role))

    db.session.add_all(users)
    db.session.commit()

    print("Creating menu items...")
    menu_items = []

    # Predefined lists of food items
    drinks = [
        {"name": "Coca Cola", "description": "Chilled and refreshing cola drink", "price": 1.99, "image": "https://en.wikipedia.org/wiki/Soft_drink#/media/File:Tumbler_of_cola_with_ice.jpg"},
        {"name": "Orange Juice", "description": "Freshly squeezed orange juice", "price": 2.49, "image": "https://en.wikipedia.org/wiki/Orange_juice#/media/File:Orange_juice.jpg"},
        {"name": "Coffee", "description": "Hot brewed coffee with a rich aroma", "price": 1.99, "image": "https://en.wikipedia.org/wiki/Coffee#/media/File:Coffee_with_ice.jpg"},
        {"name": "Tea", "description": "Hot tea with a hint of lemon", "price": 1.99, "image": "https://en.wikipedia.org/wiki/Tea#/media/File:Tea_with_ice.jpg"},
        {"name": "Smoothie", "description": "Mixed fruit smoothie with yogurt", "price": 2.49, "image": "https://en.wikipedia.org/wiki/Smoothie#/media/File:Smoothie_with_ice.jpg"}
    ]

    breakfast_items = [
        {"name": "Pancakes", "description": "Fluffy pancakes served with syrup", "price": 4.99, "image": "https://en.wikipedia.org/wiki/Pancake#/media/File:Pancake_with_ice.jpg"},
        {"name": "Omelette", "description": "Cheese and vegetable omelette", "price": 3.99, "image": "https://en.wikipedia.org/wiki/Omelette#/media/File:Omelette_with_ice.jpg"},
        {"name": "French Toast", "description": "French toast topped with powdered sugar","price": 2.99, "image": "https://en.wikipedia.org/wiki/French_toast#/media/File:French_toast_with_ice.jpg"},
        {"name": "Bagel", "description": "Freshly baked bagel with cream cheese", "price": 1.99, "image": "https://en.wikipedia.org/wiki/Bagel#/media/File:Bagel_with_ice.jpg"},
        {"name": "Yogurt Parfait", "description": "Layers of yogurt, granola, and fruit", "price": 2.49, "image": "https://en.wikipedia.org/wiki/Yogurt#/media/File:Yogurt_parfait_with_ice.jpg"}
    ]

    lunch_items = [
        {"name": "Burger", "description": "Juicy beef burger with lettuce and tomato", "price": 4.99, "image": "https://en.wikipedia.org/wiki/Burger#/media/File:Burger_with_ice.jpg"},
        {"name": "Caesar Salad", "description": "Crispy romaine with Caesar dressing", "price": 3.99, "image": "https://en.wikipedia.org/wiki/Caesar_salad#/media/File:Caesar_salad_with_ice.jpg"},
        {"name": "Grilled Chicken Sandwich", "description": "Grilled chicken on a toasted bun", "price": 3.49, "image": "https://en.wikipedia.org/wiki/Grilled_chicken#/media/File:Grilled_chicken_sandwich_with_ice.jpg"},
        {"name": "Tacos", "description": "Soft tacos with beef and fresh toppings", "price": 2.99, "image": "https://en.wikipedia.org/wiki/Taco#/media/File:Taco_with_ice.jpg"},
        {"name": "Pizza", "description": "Cheese pizza with a crispy crust", "price": 4.49, "image": "https://en.wikipedia.org/wiki/Pizza#/media/File:Pizza_with_ice.jpg"}
    ]

    # Add predefined items to the menu_items list
    for item in drinks + breakfast_items + lunch_items:
        price = round(fake.random_number(digits=2, fix_len=False) + fake.random.random(), 2)
        menu_items.append(MenuItem(name=item["name"], description=item["description"], price=price, image=item["image"]))

    db.session.add_all(menu_items)
    db.session.commit()

    print("Creating orders...")
    orders = []
    for _ in range(20):
        order = Order(
            user_id=fake.random_element(elements=[user.id for user in users]),
            menu_item_id=fake.random_element(elements=[menu_item.id for menu_item in menu_items]),
            quantity=fake.random_int(min=1, max=5),
            order_date=fake.date_time_this_year()
        )
        orders.append(order)

    db.session.add_all(orders)
    db.session.commit()

    print("Seeding done!")

