from flask import Flask, request, jsonify, abort
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Function to calculate the Fibonacci numbers up to n
def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]

    fib_numbers = [0, 1]
    for i in range(2, n):
        fib_numbers.append(fib_numbers[-1] + fib_numbers[-2])

    return fib_numbers

# Function to create the 'fibonacci' table in the SQLite database
def create_fibonacci_table():
    conn = sqlite3.connect('fibonacci.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS fibonacci (
            id INTEGER PRIMARY KEY,
            n INTEGER NOT NULL,
            numbers TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Function to save the Fibonacci numbers to the 'fibonacci' table in the database
def save_to_database(n, fib_numbers):
    conn = sqlite3.connect('fibonacci.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO fibonacci (n, numbers) VALUES (?, ?)', (n, ','.join(map(str, fib_numbers))))
    conn.commit()
    conn.close()

# Function to retrieve the Fibonacci numbers from the 'fibonacci' table based on n
def get_from_database(n):
    conn = sqlite3.connect('fibonacci.db')
    cursor = conn.cursor()
    cursor.execute('SELECT numbers FROM fibonacci WHERE n = ?', (n,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

# Route to handle GET requests on the root endpoint
@app.route('/', methods=['GET'])
def compute():
    return jsonify({'message': 'Welcome to the Fibonacci API!'})

# Route to handle POST requests on the '/fibonacci' endpoint
@app.route('/fibonacci', methods=['POST'])
def compute_fibonacci():
    data = request.get_json()
    if 'num' not in data:
        abort(400, description="Missing 'num' field in JSON data.")
    try:
        n = int(data['num'])
        if n <= 0:
            abort(400, description="'num' should be a positive integer.")
    except ValueError:
        abort(400, description="'num' should be a valid integer.")
    
    # Check if the Fibonacci numbers for n exist in the database
    fib_numbers = get_from_database(n)
    
    # If not found in the database, calculate Fibonacci numbers and save them to the database
    if fib_numbers is None:
        fib_numbers = fibonacci(n)
        save_to_database(n, fib_numbers)
    return jsonify({'fib_numbers': fib_numbers})

# Error handling for 404 Not Found
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not Found', 'message': 'The requested URL was not found on this server.'}), 404

# Error handling for 400 Bad Request
@app.errorhandler(400)
def bad_request_error(error):
    return jsonify({'error': 'Bad Request', 'message': error.description}), 400

if __name__ == '__main__':
    # Create the 'fibonacci' table in the database (this will be executed once at startup)
    create_fibonacci_table()
    # Start the Flask app on port 8000 in debug mode
    app.run(port=8000, debug=True)
