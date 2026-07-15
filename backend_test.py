#!/usr/bin/env python3
"""
Backend API Testing for Applied AI Masterclass Landing Page
Tests all endpoints with valid and invalid scenarios
"""

import requests
import json
import sys
from typing import Dict, Any

# Read backend URL from frontend/.env
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.split('=', 1)[1].strip()
    raise ValueError("REACT_APP_BACKEND_URL not found in /app/frontend/.env")

BASE_URL = get_backend_url() + "/api"
print(f"Testing backend at: {BASE_URL}\n")

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}

def log_test(name: str, passed: bool, details: str = ""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if details:
        print(f"   Details: {details}")
    print()
    
    test_results["tests"].append({
        "name": name,
        "passed": passed,
        "details": details
    })
    
    if passed:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1

def test_root_endpoint():
    """Test 1: GET /api/ - Health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        data = response.json()
        
        expected_message = "Applied AI Masterclass API"
        expected_status = "ok"
        
        if (response.status_code == 200 and 
            data.get("message") == expected_message and 
            data.get("status") == expected_status):
            log_test("GET /api/ - Health check", True, f"Response: {data}")
            return True
        else:
            log_test("GET /api/ - Health check", False, 
                    f"Status: {response.status_code}, Response: {data}")
            return False
    except Exception as e:
        log_test("GET /api/ - Health check", False, f"Exception: {str(e)}")
        return False

def test_valid_registration():
    """Test 2: POST /api/register - Valid registration"""
    payload = {
        "full_name": "Priya Sharma",
        "email": "priya.test1@example.com",
        "phone": "+91 98765 43210",
        "city": "Bengaluru",
        "current_status": "Working Professional",
        "ai_familiarity": "Intermediate",
        "attend_reason": "Productivity",
        "interested_in_programme": "Yes",
        "consent": True
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register", json=payload, timeout=10)
        data = response.json()
        
        if (response.status_code in [200, 201] and 
            data.get("success") == True and 
            "id" in data):
            log_test("POST /api/register - Valid registration", True, 
                    f"Status: {response.status_code}, ID: {data.get('id')}, Updated: {data.get('updated', False)}")
            return data.get("id")
        else:
            log_test("POST /api/register - Valid registration", False, 
                    f"Status: {response.status_code}, Response: {data}")
            return None
    except Exception as e:
        log_test("POST /api/register - Valid registration", False, f"Exception: {str(e)}")
        return None

def test_duplicate_email():
    """Test 3: POST /api/register - Duplicate email (soft update)"""
    payload = {
        "full_name": "Priya Sharma",
        "email": "priya.test1@example.com",
        "phone": "+91 98765 43210",
        "city": "Mumbai",  # Changed city
        "current_status": "Working Professional",
        "ai_familiarity": "Intermediate",
        "attend_reason": "Productivity",
        "interested_in_programme": "Yes",
        "consent": True
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register", json=payload, timeout=10)
        data = response.json()
        
        if (response.status_code in [200, 201] and 
            data.get("success") == True and 
            data.get("updated") == True):
            log_test("POST /api/register - Duplicate email (soft update)", True, 
                    f"Status: {response.status_code}, Updated: {data.get('updated')}")
            return True
        else:
            log_test("POST /api/register - Duplicate email (soft update)", False, 
                    f"Status: {response.status_code}, Response: {data}, Expected updated=True")
            return False
    except Exception as e:
        log_test("POST /api/register - Duplicate email (soft update)", False, f"Exception: {str(e)}")
        return False

def test_validation_missing_consent():
    """Test 4a: POST /api/register - Missing consent (consent: false)"""
    payload = {
        "full_name": "Test User",
        "email": "test.noconsent@example.com",
        "phone": "+91 98765 43211",
        "city": "Delhi",
        "current_status": "Student",
        "ai_familiarity": "Beginner",
        "attend_reason": "Learning",
        "interested_in_programme": "Yes",
        "consent": False  # Should fail validation
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register", json=payload, timeout=10)
        
        # Should return 4xx error
        if response.status_code >= 400 and response.status_code < 500:
            log_test("POST /api/register - Validation: consent=false", True, 
                    f"Status: {response.status_code} (correctly rejected)")
            return True
        else:
            log_test("POST /api/register - Validation: consent=false", False, 
                    f"Status: {response.status_code}, Expected 4xx error")
            return False
    except Exception as e:
        log_test("POST /api/register - Validation: consent=false", False, f"Exception: {str(e)}")
        return False

def test_validation_invalid_email():
    """Test 4b: POST /api/register - Invalid email format"""
    payload = {
        "full_name": "Test User",
        "email": "not-an-email",  # Invalid email
        "phone": "+91 98765 43212",
        "city": "Chennai",
        "current_status": "Student",
        "ai_familiarity": "Beginner",
        "attend_reason": "Learning",
        "interested_in_programme": "Yes",
        "consent": True
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register", json=payload, timeout=10)
        
        # Should return 4xx error
        if response.status_code >= 400 and response.status_code < 500:
            log_test("POST /api/register - Validation: invalid email", True, 
                    f"Status: {response.status_code} (correctly rejected)")
            return True
        else:
            log_test("POST /api/register - Validation: invalid email", False, 
                    f"Status: {response.status_code}, Expected 4xx error")
            return False
    except Exception as e:
        log_test("POST /api/register - Validation: invalid email", False, f"Exception: {str(e)}")
        return False

def test_validation_missing_field():
    """Test 4c: POST /api/register - Missing required field (full_name)"""
    payload = {
        # "full_name" is missing
        "email": "test.missing@example.com",
        "phone": "+91 98765 43213",
        "city": "Pune",
        "current_status": "Student",
        "ai_familiarity": "Beginner",
        "attend_reason": "Learning",
        "interested_in_programme": "Yes",
        "consent": True
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register", json=payload, timeout=10)
        
        # Should return 4xx error
        if response.status_code >= 400 and response.status_code < 500:
            log_test("POST /api/register - Validation: missing full_name", True, 
                    f"Status: {response.status_code} (correctly rejected)")
            return True
        else:
            log_test("POST /api/register - Validation: missing full_name", False, 
                    f"Status: {response.status_code}, Expected 4xx error")
            return False
    except Exception as e:
        log_test("POST /api/register - Validation: missing full_name", False, f"Exception: {str(e)}")
        return False

def test_registrations_count():
    """Test 5: GET /api/registrations/count - Count registrations"""
    try:
        response = requests.get(f"{BASE_URL}/registrations/count", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "count" in data:
            count = data.get("count")
            if count >= 1:
                log_test("GET /api/registrations/count", True, 
                        f"Count: {count} (>= 1 as expected)")
                return True
            else:
                log_test("GET /api/registrations/count", False, 
                        f"Count: {count}, Expected >= 1")
                return False
        else:
            log_test("GET /api/registrations/count", False, 
                    f"Status: {response.status_code}, Response: {data}")
            return False
    except Exception as e:
        log_test("GET /api/registrations/count", False, f"Exception: {str(e)}")
        return False

def test_list_registrations():
    """Test 6: GET /api/registrations - List all registrations"""
    try:
        response = requests.get(f"{BASE_URL}/registrations", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and isinstance(data, list):
            # Check if our test registration is in the list
            found = False
            for reg in data:
                if reg.get("email") == "priya.test1@example.com":
                    found = True
                    break
            
            if found:
                log_test("GET /api/registrations", True, 
                        f"Found {len(data)} registrations, including test registration")
                return True
            else:
                log_test("GET /api/registrations", False, 
                        f"Found {len(data)} registrations, but test registration not found")
                return False
        else:
            log_test("GET /api/registrations", False, 
                    f"Status: {response.status_code}, Response type: {type(data)}")
            return False
    except Exception as e:
        log_test("GET /api/registrations", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all tests in sequence"""
    print("=" * 80)
    print("BACKEND API TESTING - Applied AI Masterclass")
    print("=" * 80)
    print()
    
    # Test 1: Health check
    test_root_endpoint()
    
    # Test 2: Valid registration
    registration_id = test_valid_registration()
    
    # Test 3: Duplicate email (soft update)
    test_duplicate_email()
    
    # Test 4a: Validation - missing consent
    test_validation_missing_consent()
    
    # Test 4b: Validation - invalid email
    test_validation_invalid_email()
    
    # Test 4c: Validation - missing required field
    test_validation_missing_field()
    
    # Test 5: Count registrations
    test_registrations_count()
    
    # Test 6: List registrations
    test_list_registrations()
    
    # Summary
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
    print(f"Passed: {test_results['passed']}")
    print(f"Failed: {test_results['failed']}")
    print()
    
    if test_results['failed'] > 0:
        print("FAILED TESTS:")
        for test in test_results['tests']:
            if not test['passed']:
                print(f"  - {test['name']}")
                if test['details']:
                    print(f"    {test['details']}")
        sys.exit(1)
    else:
        print("✅ ALL TESTS PASSED!")
        sys.exit(0)

if __name__ == "__main__":
    main()
