from dotenv import load_dotenv
import os
from app import app

load_dotenv()

port = os.getenv("FLASK_PORT")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=port)