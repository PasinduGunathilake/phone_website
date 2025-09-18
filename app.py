from flask import Flask, jsonify, request, render_template, session
from flask_cors import CORS
import uuid
from chatbot_backend import get_chatbot_response

app = Flask(__name__)
app.secret_key = 'GEMINI_API_KEY'
CORS(app)

@app.route('/')
def index():
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())
    return render_template('index.html')

@app.route('/cart/')
def cart():
    return render_template('cart.html')

@app.route('/product/')
def product():
    return render_template('product.html')

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        # Get the session ID from the user's session
        session_id = session.get('session_id', 'default')
        
        # Get response from the chatbot
        response = get_chatbot_response(message, session_id)
        
        return jsonify({'response': response})
    except Exception as e:
        print(f"Error in chatbot endpoint: {e}")
        return jsonify({'response': "Sorry, I'm having trouble processing your request right now."}), 500

if __name__ == '__main__':
    app.run(debug=True)
