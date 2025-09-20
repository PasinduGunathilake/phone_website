from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# ---------- HTML Routes ----------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cart/')
def cart():
    return render_template('cart.html')

@app.route('/product/')
def product():
    return render_template('product.html')

# ---------- API Route: Serve products.json ----------
@app.route('/api/products')
def get_products():
    json_path = os.path.join(app.root_path, 'data', 'products.json')
    if not os.path.exists(json_path):
        return jsonify({"error": "products.json not found"}), 404
    with open(json_path, 'r') as f:
        products = json.load(f)
    return jsonify(products)

# ---------- File Server: Serve any file from data/ ----------
@app.route('/data/<path:filename>')
def serve_data(filename):
    # Absolute path to the 'data' folder
    data_dir = os.path.join(app.root_path, 'data')
    # Check if the file exists
    file_path = os.path.join(data_dir, filename)
    if not os.path.isfile(file_path):
        return jsonify({"error": f"{filename} not found"}), 404
    return send_from_directory(data_dir, filename)

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    json_path = os.path.join("data", "products.json")
    with open(json_path) as f:
        products = json.load(f)

    # find product by id
    product = next((p for p in products if p["id"] == product_id), None)

    if not product:
        return "Product not found", 404

    return render_template("product.html", product=product)

# ---------- Run the app ----------
if __name__ == '__main__':
    app.run(debug=True)
