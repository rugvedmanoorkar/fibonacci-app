from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

def save_to_database(n, fib_numbers):
    conn = sqlite3.connect('fibonacci.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO fibonacci (n, numbers) VALUES (?, ?)', (n, ','.join(map(str, fib_numbers))))
    conn.commit()
    conn.close()

def get_from_database(n):
    
    conn = sqlite3.connect('fibonacci.db')
    cursor = conn.cursor()
    cursor.execute('SELECT numbers FROM fibonacci WHERE n = ?', (n,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None


@app.route('/', methods=['GET'])
def compute():
    return jsonify({'fib_numbers': "fib_numbers"})


@app.route('/fibonacci', methods=['POST'])
def compute_fibonacci():
    data = request.get_json()
    n = int(data['num'])
    print(n)
    fib_numbers = get_from_database(n)
    if fib_numbers is None:
        fib_numbers = fibonacci(n)
        save_to_database(n, fib_numbers)
    return jsonify({'fib_numbers': fib_numbers})

    

if __name__ == '__main__':

    app.run(port=8000,debug=True)
    create_fibonacci_table()