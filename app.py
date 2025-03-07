from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/events')
def get_events():
    with open('data/events.json') as f:
        events = json.load(f)
    return jsonify(events)

if __name__ == '__main__':
    app.run(debug=True)
