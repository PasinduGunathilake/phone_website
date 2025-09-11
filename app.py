from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cart/')
def cart():
    return render_template('cart.html')

@app.route('/product/')
def product():
    return render_template('product.html')
# ...add more routes for cart, orders, etc...


if __name__ == '__main__':
    app.run(debug=True)
