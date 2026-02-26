#!/usr/bin/env python3
"""
Cafe TAB Backend API Testing Suite
Tests all REST API endpoints for menu items, promotions, and contact submissions
"""

import requests
import sys
from datetime import datetime
import json

class CafeTabAPITester:
    def __init__(self, base_url="https://cozy-break-cafe.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, status_code=None, error=None):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED")
            if status_code:
                print(f"   Status: {status_code}")
            if error:
                print(f"   Error: {error}")
        
        self.test_results.append({
            "test_name": name,
            "success": success,
            "status_code": status_code,
            "error": error
        })

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            self.log_test(name, success, response.status_code)
            
            return success, response.json() if success and response.content else None

        except Exception as e:
            self.log_test(name, False, error=str(e))
            return False, None

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_menu_operations(self):
        """Test all menu CRUD operations"""
        print("\n🍽️  Testing Menu Operations...")
        
        # Get all menu items
        success, menu_items = self.run_test("Get All Menu Items", "GET", "menu", 200)
        if not success:
            return False
            
        # Test menu category filtering if items exist
        if menu_items and len(menu_items) > 0:
            categories = ["Coffee & Beverages", "Snacks & Appetizers", "Main Courses", "Specials & Combos", "Desserts"]
            for category in categories:
                self.run_test(f"Get Menu Items - {category}", "GET", f"menu?category={category}", 200)
        
        # Create a test menu item
        test_item = {
            "name": "Test Coffee",
            "description": "A test coffee item",
            "price": 150.0,
            "category": "Coffee & Beverages",
            "image_url": "https://example.com/coffee.jpg",
            "is_available": True
        }
        
        success, created_item = self.run_test("Create Menu Item", "POST", "menu", 201, test_item)
        if not success:
            return False
            
        if created_item:
            item_id = created_item.get('id')
            
            # Update the item
            update_data = {"price": 175.0, "is_available": False}
            self.run_test("Update Menu Item", "PUT", f"menu/{item_id}", 200, update_data)
            
            # Delete the item
            self.run_test("Delete Menu Item", "DELETE", f"menu/{item_id}", 200)
            
            # Try to get deleted item (should fail)
            self.run_test("Get Deleted Menu Item", "GET", f"menu/{item_id}", 404)
        
        return True

    def test_promotion_operations(self):
        """Test all promotion CRUD operations"""
        print("\n🎉 Testing Promotion Operations...")
        
        # Get active promotions
        success, promotions = self.run_test("Get Active Promotions", "GET", "promotions", 200)
        if not success:
            return False
            
        # Get all promotions (including inactive)
        self.run_test("Get All Promotions", "GET", "promotions?active_only=false", 200)
        
        # Create a test promotion
        test_promo = {
            "title": "Test Promotion",
            "description": "This is a test promotion",
            "is_active": True
        }
        
        success, created_promo = self.run_test("Create Promotion", "POST", "promotions", 201, test_promo)
        if not success:
            return False
            
        if created_promo:
            promo_id = created_promo.get('id')
            
            # Update the promotion
            update_data = {"title": "Updated Test Promotion", "is_active": False}
            self.run_test("Update Promotion", "PUT", f"promotions/{promo_id}", 200, update_data)
            
            # Delete the promotion
            self.run_test("Delete Promotion", "DELETE", f"promotions/{promo_id}", 200)
        
        return True

    def test_contact_operations(self):
        """Test contact form submission"""
        print("\n📧 Testing Contact Operations...")
        
        # Submit a test contact form
        test_contact = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message from automated testing."
        }
        
        success, submission = self.run_test("Submit Contact Form", "POST", "contact", 201, test_contact)
        if not success:
            return False
            
        # Get all contact submissions
        self.run_test("Get Contact Submissions", "GET", "contact", 200)
        
        return True

    def test_error_scenarios(self):
        """Test error handling scenarios"""
        print("\n❗ Testing Error Scenarios...")
        
        # Test invalid menu item creation (missing required fields)
        invalid_item = {"name": "Incomplete Item"}
        self.run_test("Create Invalid Menu Item", "POST", "menu", 422, invalid_item)
        
        # Test invalid promotion creation
        invalid_promo = {"title": ""}  # Empty title
        self.run_test("Create Invalid Promotion", "POST", "promotions", 422, invalid_promo)
        
        # Test invalid contact submission
        invalid_contact = {"name": "Test"}  # Missing email and message
        self.run_test("Submit Invalid Contact", "POST", "contact", 422, invalid_contact)
        
        # Test non-existent resource access
        self.run_test("Get Non-existent Menu Item", "GET", "menu/invalid-id", 404)
        self.run_test("Update Non-existent Promotion", "PUT", "promotions/invalid-id", 404, {"title": "Test"})
        
        return True

    def run_all_tests(self):
        """Run all test suites"""
        print("🧪 Starting Cafe TAB Backend API Tests...")
        print(f"🔗 Testing API at: {self.api_url}")
        print("=" * 60)
        
        # Test API root
        self.test_api_root()
        
        # Test all operations
        self.test_menu_operations()
        self.test_promotion_operations() 
        self.test_contact_operations()
        self.test_error_scenarios()
        
        # Print final results
        print("\n" + "=" * 60)
        print("🏁 Test Results Summary:")
        print(f"   Total Tests: {self.tests_run}")
        print(f"   Passed: {self.tests_passed}")
        print(f"   Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test execution"""
    tester = CafeTabAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/test_reports/backend_test_results.json', 'w') as f:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'total_tests': tester.tests_run,
            'passed_tests': tester.tests_passed,
            'success_rate': (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
            'test_details': tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())