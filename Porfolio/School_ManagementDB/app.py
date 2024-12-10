from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'Connect@77',
    'database': 'School_ManagementDB'
}

# Create connection
def get_db_connection():
    conn = mysql.connector.connect(**db_config)
    return conn

# Add a student
@app.route('/add_student', methods=['POST'])
def add_student():
    data = request.json
    query = """
        INSERT INTO students (first_name, last_name, gender, date_of_birth, address, contact_number, email, enrollment_date)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        data['first_name'],
        data['last_name'],
        data['gender'],
        data['dob'],
        data['address'],
        data['contact_number'],
        data['email'],
        data['enrollment_date']
    )

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(query, values)
        conn.commit()
        return jsonify({'message': 'Student added successfully!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        conn.close()

# Delete a student by ID
@app.route('/delete_student/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM students WHERE id = %s", (student_id,))
        conn.commit()
        return jsonify({'message': 'Student deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        conn.close()

# Get all students
@app.route('/students', methods=['GET'])
def get_students():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(students)

# Add class with teacher
@app.route('/add_class', methods=['POST'])
def add_class():
    data = request.json
    query = """
        INSERT INTO classes (class_name, teacher_id, schedule, room_number')
        VALUES (%s, %s, %s)
    """
    values = (data['class_name'], data['teacher_id'], data['schedule'], data['room_number'])

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(query, values)
        conn.commit()
        return jsonify({'message': 'Class added successfully!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)


