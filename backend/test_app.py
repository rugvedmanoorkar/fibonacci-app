import unittest
import json
from app import app,create_fibonacci_table
import sqlite3

class FibonacciAPITestCase(unittest.TestCase):

    def setUp(self):
        # Set up a test client
        self.app = app.test_client()
        # Create the 'fibonacci' table in the database (for testing purposes)
        create_fibonacci_table()

    def tearDown(self):
        # Remove the 'fibonacci' table from the database after each test (for testing purposes)
        conn = sqlite3.connect('fibonacci.db')
        cursor = conn.cursor()
        cursor.execute('DROP TABLE IF EXISTS fibonacci')
        conn.commit()
        conn.close()

    def test_root_endpoint(self):
        # Test the root endpoint
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(data['message'], 'Welcome to the Fibonacci API!')

    def test_compute_fibonacci_with_valid_input(self):
        # Test the '/fibonacci' endpoint with valid input
        payload = {'num': 5}
        response = self.app.post('/fibonacci', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(data['fib_numbers'], [0, 1, 1, 2, 3])

    def test_compute_fibonacci_with_invalid_input(self):
        # Test the '/fibonacci' endpoint with invalid input
        payload = {'num': -5}
        response = self.app.post('/fibonacci', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(data['error'], 'Bad Request')

    def test_compute_fibonacci_with_missing_num_field(self):
        # Test the '/fibonacci' endpoint with missing 'num' field in the JSON data
        payload = {'wrong_key': 5}
        response = self.app.post('/fibonacci', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(data['error'], 'Bad Request')

if __name__ == '__main__':
    unittest.main()
