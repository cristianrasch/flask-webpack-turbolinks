from dotenv import load_dotenv
from flask import Flask, render_template
from flask_static_digest import FlaskStaticDigest

__version__ = '0.1.0'

load_dotenv()

app = Flask(__name__)

flask_static_digest = FlaskStaticDigest(app)

@app.route('/')
def home():
    return render_template('index.html', location='HOME')

@app.route('/page1')
def page1():
    return render_template('index.html', location='PAGE #1')

@app.route('/page2')
def page2():
    return render_template('index.html', location='PAGE #2')
