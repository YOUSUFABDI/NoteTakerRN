from flask import Flask
from config.config import Config
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

app.config.from_object(Config)

# DB connection
app.config['MYSQL_CONNECTION'] = mysql.connector.connect(
    host=app.config['MYSQL_HOST'],
    port=app.config['MYSQL_PORT'],
    user=app.config['MYSQL_USER'], 
    password=app.config['MYSQL_PASSWORD'],
    database=app.config['MYSQL_DB']
)

from app.routes.auth_routes import auth_bp
from app.routes.note_routes import note_bp

app.register_blueprint(auth_bp)
app.register_blueprint(note_bp)
