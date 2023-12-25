from flask import Blueprint, request, jsonify
from app import app
from app.models.auth import create_user, hash_password, user_exists, gmail_exists, verify_user, send_otp_code, verify_otp_code
import random, string
from flask_mail import Message, Mail

mail = Mail(app)

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    full_name = request.json.get('full_name')
    age = request.json.get('age')
    address = request.json.get('address')
    gmail = request.json.get('gmail')
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if username already exists
    if user_exists(username):
        return jsonify({"error": "Username already exists"}), 400
    
    # Check if gmail already exists
    if gmail_exists(gmail):
        return jsonify({"error": "Gmail already exists"}), 400

    # Hash the password
    hashed_password = hash_password(password)

    # Generate OTP code
    otp_code = ''.join(random.choices(string.digits, k=4))

    # Create a new user in the database
    user_id = create_user(full_name, age, address, gmail, username, hashed_password, otp_code)

    # Send something user to his gmail
    send_otp_code(gmail, otp_code)

    return jsonify({"message": "success", "user_id": user_id}), 201

@auth_bp.route('/verify_otp', methods=['POST'])
def verify_otp():
    gmail = request.json.get('gmail')
    otp_code = request.json.get('otp_code')

    # Verify the OTP code
    success, user_id = verify_otp_code(gmail, otp_code)

    if success:
        return jsonify({"message": "OTP verified successfully", "user_id": user_id}), 200
    else:
        return jsonify({"error": "Invalid OTP code"}), 400


@auth_bp.route('/login', methods=["POST"])
def login():
    username = request.json.get('username')
    password = request.json.get("password")

    # Check if username exists
    if not verify_user(username, password):
        return jsonify({"error": "Invalid username or password"}), 401
    
    return jsonify({"message": "Loged in successful"}), 200 

@auth_bp.route('/get_user', methods=['POST'])
def get_user():
    username = request.json.get('username')

    # Check if the user exists 
    cursor = app.config['MYSQL_CONNECTION'].cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()

    if not user:
        return jsonify({'error': "User not found"}), 404
    
    # Construct the user info response
    user_info = {
        "full_name": user[1],
        "age": user[2],
        "address": user[3],
        "gmail": user[4],
        "username": user[5]
    }

    return jsonify({"user": user_info}), 200

# Forgot password api's
@auth_bp.route('/forgot_password', methods=["POST"])
def forgot_password():
    gmail = request.json.get("gmail")

    # Check if gmail exists
    if not gmail_exists(gmail):
        return jsonify({"error": "Gmail not found"}), 404
    
    # Generate OTP code
    otp_code = ''.join(random.choices(string.digits, k=4))

    # Store OTP code in the DB
    cursor = app.config['MYSQL_CONNECTION'].cursor()
    cursor.execute("DELETE FROM forgot_pass WHERE gmail = %s", (gmail,))
    cursor.execute("INSERT INTO forgot_pass (gmail, otp_code) VALUES (%s, %s)", (gmail, otp_code))
    app.config['MYSQL_CONNECTION'].commit()
    cursor.close()

    # Send OTP code as gmail to check if user belongs the gmail
    subject = "Password reset OTP"
    body = f'Your OTP code for password reset is: {otp_code}'
    sender = app.config['MAIL_DEFAULT_SENDER']
    message = Message(subject=subject, body=body, recipients=[gmail], sender=sender)
    mail.send(message)

    return jsonify({"message": "Send Password reset OTP code successfully"}), 200

# Verifies reset OTP code
@auth_bp.route('/verify_reset_otp', methods=["POST"])
def verify_reset_otp():
    gmail = request.json.get('gmail')
    otp_code = request.json.get('otp_code')

    cursor = app.config['MYSQL_CONNECTION'].cursor()
    cursor.execute('SELECT * FROM forgot_pass WHERE gmail = %s AND otp_code = %s', (gmail, otp_code))
    result = cursor.fetchone()

    # Remove the entry from the OTP table
    cursor.execute("DELETE FROM forgot_pass WHERE gmail = %s", (gmail,))
    app.config['MYSQL_CONNECTION'].commit()

    cursor.close()

    if not result:
        return jsonify({"error": "Invalid OTP code"}), 400
    else:
        return jsonify({"message": "Success valid OTP"})

@auth_bp.route('/reset_password', methods=["POST"])
def reset_password():
    new_password = request.json.get("new_password")
    gmail = request.json.get('gmail')

    # Check if gmail exists
    if not gmail_exists(gmail):
        return jsonify({"error": "Gmail not found"}), 404

    hashed_password = hash_password(new_password)

    cursor = app.config['MYSQL_CONNECTION'].cursor()
    cursor.execute('UPDATE users SET password = %s WHERE gmail = %s', (hashed_password, gmail))
    app.config['MYSQL_CONNECTION'].commit()
    cursor.close()

    return jsonify({"message": "Password changed successfully"}), 200