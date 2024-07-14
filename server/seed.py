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

    # New lists of food items with direct image URLs
    new_items = [
        {"name": "Chicken Tenders", "description": "Crispy fried chicken tenders", "price": 5.99, "image":" https://www.wellplated.com/wp-content/uploads/2023/05/Oven-Fried-Chicken-Tenders-Recipe.jpg"},
        {"name": "Loaded Fries", "description": "Fries topped with cheese and bacon", "price": 4.49, "image": "https://i.pinimg.com/564x/09/55/e8/0955e8fe4b333f8ede041b56b7c9ef32.jpg"},
        {"name": "Chicken Alfredo", "description": "Creamy Alfredo pasta with chicken", "price": 7.99, "image": "https://i.pinimg.com/564x/55/e8/6d/55e86d6d91966e09f0723953d3aca9bc.jpg"},
        {"name": "Crispy Chicken Waffles", "description": "Crispy chicken served on waffles", "price": 6.99, "image": "https://i.pinimg.com/564x/e6/70/fc/e670fc161bd48c5a6a5265e10bdd3173.jpg"},
        {"name": "French Toast", "description": "French toast topped with powdered sugar", "price": 2.99, "image": "https://i.pinimg.com/564x/66/1b/56/661b564c8ecdacbe6f5aa572ecfbec2e.jpg"},
        {"name": "Pancakes", "description": "Fluffy pancakes served with syrup", "price": 4.99, "image": "https://i.pinimg.com/564x/d4/51/bb/d451bbd122696594f8f47b552127c84e.jpg"},
        {"name": "Avocado Toast", "description": "Toasted bread with avocado spread", "price": 3.99, "image": "https://i.pinimg.com/564x/e4/13/32/e41332a6899fe73ae4f01d2941fcc4dd.jpg"},
        {"name": "Granola Bowl", "description": "Granola served with yogurt and fruit", "price": 3.49, "image": "https://i.pinimg.com/564x/61/1d/b2/611db2e2371534c85cd2cdbd70731a21.jpg"},
        {"name": "Chia Seed Pudding", "description": "Chia seeds soaked in almond milk", "price": 2.99, "image": "https://i.pinimg.com/564x/fb/8f/9f/fb8f9fb6a48ce0a3918b9dfee8fd490e.jpg"},
        {"name": "Buffalo Wings", "description": "Spicy buffalo chicken wings", "price": 5.99, "image": "https://i.pinimg.com/564x/f8/15/16/f815162ceda4f463b6378dc515c0446d.jpg"},
        {"name": "Shakshuka", "description": "Poached eggs in spicy tomato sauce", "price": 6.49, "image": "https://i.pinimg.com/564x/f6/ad/a7/f6ada76084e3ad747e9dcca045287b1c.jpg"},
        {"name": "Pilau", "description": "Spiced rice with meat and vegetables", "price": 7.99, "image": "https://i.pinimg.com/564x/61/9c/a6/619ca6bfd103a9b04fc88c5a61a84304.jpg"},
        {"name": "Anjera Ethiopia", "description": "Traditional Ethiopian sourdough flatbread", "price": 4.49, "image": "https://i.pinimg.com/564x/4c/00/d2/4c00d2902bf1bfd7d552d7948a8a7d5c.jpg"},
        {"name": "Strawberry Lemonade", "description": "Refreshing lemonade with strawberries", "price": 2.99, "image": "https://i.pinimg.com/564x/ab/42/a8/ab42a8355cd309d0cfefede7db9bcd96.jpg"},
        {"name": "Pasta Salad", "description": "Cold pasta salad with vegetables and dressing", "price": 3.99, "image": "https://i.pinimg.com/564x/b6/ab/91/b6ab9114cff25b7db943eac01030e3b6.jpg"}
    ]

    # Add new items to the menu_items list
    for item in new_items:
        menu_items.append(MenuItem(name=item["name"], description=item["description"], price=item["price"], image=item["image"]))

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
