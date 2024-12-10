# app.py
from flask import Flask, request, render_template, redirect, url_for, flash
from flask_mail import Mail, Message

app = Flask(__name__)

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'euegbo@gmail.com'  # Your email
app.config['MAIL_PASSWORD'] = 'your-email-password'  # Your email password
app.config['MAIL_DEFAULT_SENDER'] = ('Your Name', 'euegbo@gmail.com')

mail = Mail(app)

@app.route('/')
def index():
    return render_template('contact.html')  # Make sure you have a template

@app.route('/send_email', methods=['POST'])
def send_email():
    name = request.form['name']
    email = request.form['email']
    telephone = request.form['telephone']
    subject = request.form['subject']
    message = request.form['message']

    # Compose the email
    msg = Message(subject=f'New Contact Form Submission from {name}',
                recipients=['euegbo@gmail.com'])  # Your receiving email
    msg.body = f"Sender: {name} \nEmail: {email}\n\nMessage: {message}"

    try:
        mail.send(msg)
        flash('Message sent successfully!')
        return redirect(url_for('index'))
    except Exception as e:
        print(f"Failed to send email: {e}")
        flash('Message sending failed. Please try again later.')
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.secret_key = 'your-secret-key'  # For flash messages
    app.run(debug=True)
