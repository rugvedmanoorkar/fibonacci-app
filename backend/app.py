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


@app.route('/', methods=['GET'])
def compute():
    return jsonify({'fib_numbers': "fib_numbers"})


@app.route('/fibonacci', methods=['POST'])
def compute_fibonacci():
    data = request.get_json()
    n = int(data['num'])
    print(n)
    fib_numbers = fibonacci(n)
    return jsonify({'fib_numbers': fib_numbers})


if __name__ == '__main__':
    app.run(port=8000,debug=True)