from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

items = [
        {'id': 1, 'name': 'Item 1', 'description': 'This is the first item.'},
        {'id': 2, 'name': 'Item 2', 'description': 'This is the second item.'},
    ]

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(items)

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    for item in items:
        if item['id'] == id:
            return jsonify(item)
    return jsonify({'message': 'Product not found'})


@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        data = request.get_json()["data"]
        for item in items:
            if item['id'] == id:
                item['name'] = data['name']
                item['description'] = data['description']
                return jsonify(item)
        return jsonify({'message': 'Product not found'})
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500 

@app.route('/api/products', methods=['POST'])
def create_product():
    try:
        data = request.get_json()["data"]
        item = {'id': len(items) + 1, 'name': data['name'], 'description': data['description'] , 'price': data['price'] , 'image': data['image']}
        items.append(item)
        return jsonify(item)
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500 

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    for item in items:
        if item['id'] == id:
            items.remove(item)
            return jsonify({'message': 'Product deleted'})
    return jsonify({'message': 'Product not found'})


if __name__ == '__main__':
    app.run(port=5000,debug=True)
