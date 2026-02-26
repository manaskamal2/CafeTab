import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


async def seed_menu_items():
    # Clear existing menu items
    await db.menu_items.delete_many({})
    
    menu_items = [
        # Coffee & Beverages
        {
            "id": str(uuid.uuid4()),
            "name": "Classic Espresso",
            "description": "Rich and bold double shot of Italian espresso",
            "price": 80.0,
            "category": "Coffee & Beverages",
            "image_url": "https://images.pexels.com/photos/28052357/pexels-photo-28052357.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Cappuccino",
            "description": "Creamy cappuccino with perfect foam art",
            "price": 100.0,
            "category": "Coffee & Beverages",
            "image_url": "https://images.pexels.com/photos/28052357/pexels-photo-28052357.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Cafe Latte",
            "description": "Smooth espresso with steamed milk",
            "price": 110.0,
            "category": "Coffee & Beverages",
            "image_url": "https://images.pexels.com/photos/28052357/pexels-photo-28052357.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Cold Coffee",
            "description": "Refreshing cold coffee with ice cream",
            "price": 120.0,
            "category": "Coffee & Beverages",
            "image_url": "https://images.pexels.com/photos/28052357/pexels-photo-28052357.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Masala Chai",
            "description": "Traditional Indian spiced tea",
            "price": 40.0,
            "category": "Coffee & Beverages",
            "image_url": "https://images.pexels.com/photos/28052357/pexels-photo-28052357.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        
        # Snacks & Appetizers
        {
            "id": str(uuid.uuid4()),
            "name": "Veg Momos (Steamed)",
            "description": "Delicious steamed dumplings with spicy chutney",
            "price": 60.0,
            "category": "Snacks & Appetizers",
            "image_url": "https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Chicken Momos (Fried)",
            "description": "Crispy fried chicken momos with tangy sauce",
            "price": 80.0,
            "category": "Snacks & Appetizers",
            "image_url": "https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Paneer Momos",
            "description": "Steamed momos filled with cottage cheese",
            "price": 70.0,
            "category": "Snacks & Appetizers",
            "image_url": "https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "French Fries",
            "description": "Crispy golden fries with ketchup",
            "price": 50.0,
            "category": "Snacks & Appetizers",
            "image_url": "https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Spring Rolls",
            "description": "Crunchy vegetable spring rolls",
            "price": 70.0,
            "category": "Snacks & Appetizers",
            "image_url": "https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        
        # Main Courses
        {
            "id": str(uuid.uuid4()),
            "name": "Chicken Biryani",
            "description": "Aromatic basmati rice with tender chicken and spices",
            "price": 180.0,
            "category": "Main Courses",
            "image_url": "https://images.pexels.com/photos/29631417/pexels-photo-29631417.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Veg Biryani",
            "description": "Flavorful vegetable biryani with raita",
            "price": 150.0,
            "category": "Main Courses",
            "image_url": "https://images.pexels.com/photos/29631417/pexels-photo-29631417.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Paneer Butter Masala",
            "description": "Creamy cottage cheese curry with naan",
            "price": 160.0,
            "category": "Main Courses",
            "image_url": "https://images.pexels.com/photos/29631417/pexels-photo-29631417.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Chicken Sandwich",
            "description": "Grilled chicken sandwich with fresh veggies",
            "price": 90.0,
            "category": "Main Courses",
            "image_url": "https://images.pexels.com/photos/29631417/pexels-photo-29631417.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        
        # Specials & Combos
        {
            "id": str(uuid.uuid4()),
            "name": "Student Special Combo",
            "description": "Sandwich + Cold Coffee + Fries",
            "price": 200.0,
            "category": "Specials & Combos",
            "image_url": "https://images.pexels.com/photos/35204925/pexels-photo-35204925.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Momos Party Pack",
            "description": "50 pcs mixed momos with all chutneys",
            "price": 450.0,
            "category": "Specials & Combos",
            "image_url": "https://images.pexels.com/photos/35204925/pexels-photo-35204925.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Coffee Lovers Combo",
            "description": "2 Cappuccinos + 2 Brownies",
            "price": 280.0,
            "category": "Specials & Combos",
            "image_url": "https://images.pexels.com/photos/35204925/pexels-photo-35204925.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        
        # Desserts
        {
            "id": str(uuid.uuid4()),
            "name": "Chocolate Brownie",
            "description": "Warm chocolate brownie with ice cream",
            "price": 90.0,
            "category": "Desserts",
            "image_url": "https://images.pexels.com/photos/35204925/pexels-photo-35204925.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Vanilla Ice Cream",
            "description": "Classic vanilla ice cream scoop",
            "price": 50.0,
            "category": "Desserts",
            "image_url": "https://images.pexels.com/photos/35204925/pexels-photo-35204925.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Gulab Jamun",
            "description": "Traditional Indian sweet dumplings",
            "price": 60.0,
            "category": "Desserts",
            "image_url": "https://images.pexels.com/photos/35204925/pexels-photo-35204925.jpeg",
            "is_available": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
    ]
    
    await db.menu_items.insert_many(menu_items)
    print(f"✓ Seeded {len(menu_items)} menu items")


async def seed_promotions():
    # Clear existing promotions
    await db.promotions.delete_many({})
    
    promotions = [
        {
            "id": str(uuid.uuid4()),
            "title": "🎉 20% Off Till Holi!",
            "description": "Get 20% discount on all food items. Valid till Holi festival.",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Free Wi-Fi Available",
            "description": "Stay connected with high-speed free Wi-Fi for all customers",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.promotions.insert_many(promotions)
    print(f"✓ Seeded {len(promotions)} promotions")


async def main():
    print("Seeding database...")
    await seed_menu_items()
    await seed_promotions()
    print("✓ Database seeding complete!")
    client.close()


if __name__ == "__main__":
    asyncio.run(main())
