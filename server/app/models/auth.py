from app import app
import bcrypt
from flask_mail import Message, Mail

mail = Mail(app) 

def user_exists(username):
    cursor = app.config['MYSQL_CONNECTION'].cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    return user is not None

def gmail_exists(gmail):
    cursor = app.config['MYSQL_CONNECTION'].cursor()
    cursor.execute("SELECT * FROM users WHERE gmail = %s", (gmail,))
    gmail = cursor.fetchone()
    return gmail is not None

def hash_password(password):
     # Hashing the password using bcrypt
     hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
     return hashed_password

def create_user(full_name, age, address, gmail, username, password, otp_code):
     cursor = app.config['MYSQL_CONNECTION'].cursor()
     cursor.execute("DELETE FROM otp_codes WHERE gmail = %s", (gmail,))
     cursor.execute("INSERT INTO otp_codes (full_name, age, address, gmail, username, password, otp_code) VALUES (%s, %s, %s, %s, %s, %s, %s)", (full_name, age, address, gmail, username, password, otp_code))
     app.config['MYSQL_CONNECTION'].commit()
     user_id = cursor.lastrowid
     cursor.close()
     return user_id

def verify_user(username, password):
    cursor = app.config['MYSQL_CONNECTION'].cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()

    # Check if the user exists and the password is correct
    if user and bcrypt.checkpw(password.encode('utf-8'), user[6].encode('utf-8')):
        return True

    return False

def send_otp_code(gmail, otp_code):
    subject = 'Welcome to Note Taker App!'
    body = f'Your OTP code is: {otp_code}'
    sender = app.config['MAIL_DEFAULT_SENDER']

    message = Message(subject=subject, body=body, recipients=[gmail], sender=sender)
    mail.send(message)

# Inside app/models/auth.py

def verify_otp_code(gmail, otp_code):
    cursor = app.config['MYSQL_CONNECTION'].cursor()
    cursor.execute("SELECT * FROM otp_codes WHERE gmail = %s AND otp_code = %s", (gmail, otp_code))
    user_data = cursor.fetchone()
    cursor.close()

    if user_data:
        # Get column names from cursor description
        columns = [column[0] for column in cursor.description]

        # Build a dictionary from column names and corresponding values
        user_data_dict = dict(zip(columns, user_data))

        # If the OTP is correct, move the user to the users table
        cursor = app.config['MYSQL_CONNECTION'].cursor()
        cursor.execute("INSERT INTO users (full_name, age, address, gmail, username, password) VALUES (%s, %s, %s, %s, %s, %s)",
                       (user_data_dict['full_name'], user_data_dict['age'], user_data_dict['address'], user_data_dict['gmail'], user_data_dict['username'], user_data_dict['password']))
        app.config['MYSQL_CONNECTION'].commit()

        # Remove the entry from the OTP table
        cursor.execute("DELETE FROM otp_codes WHERE gmail = %s", (gmail,))
        app.config['MYSQL_CONNECTION'].commit()

        user_id = cursor.lastrowid
        cursor.close()
        return True, user_id
    else:
        return False, "Invalid OTP code"

