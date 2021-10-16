from flask import Flask
from flask import request,session,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import URL

import uuid

# Google Cloud SQL (change this accordingly)
PASSWORD ="cohen0731"
PUBLIC_IP_ADDRESS ="35.224.73.35"
DBNAME ="datathon"
PROJECT_ID ="geometric-rex-329215"
INSTANCE_NAME ="datathon-db"
 
app= Flask(__name__)
app.secret_key = uuid.uuid4().hex
 

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://root:{PASSWORD}@{PUBLIC_IP_ADDRESS}:3306/{DBNAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]= True
db  =  SQLAlchemy(app)

class Test(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)

@app.route('/')
def home():
    if(check_session()):
        return redirect('/datathon/patients',code = 302)
    else:
        return redirect('/login', code = 302)

@app.route('/validate', methods=['POST'])
def login():
    user = request.form.get('username',None)
    passw = request.form.get('password', None)
    login = Test.query.filter(Test.username==user, Test.password == passw).first()
    if not login is None:
        session['username'] = user
        return jsonify(success=True)
    else:
        return jsonify(success = False)
def check_session():
    return jsonify(success = True) if session.get('username', False) else jsonify(success = False)
@app.route('/logout')
def logout():
    session.pop('username',None)
    return redirect(url_for('home'))