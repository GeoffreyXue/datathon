from flask import Flask
from flask import request,session,jsonify,redirect,url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import URL
from sqlalchemy import MetaData
from flask_cors import CORS

import uuid

# Google Cloud SQL (change this accordingly)
PASSWORD ="cohen0731"
PUBLIC_IP_ADDRESS ="35.224.73.35"
DBNAME ="datathon"
PROJECT_ID ="geometric-rex-329215"
INSTANCE_NAME ="datathon-db"
 
app = Flask(__name__)
app.secret_key = uuid.uuid4().hex
CORS(app, resources={r"/*": {"origins": "*"}})
 

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://root:{PASSWORD}@{PUBLIC_IP_ADDRESS}:3306/{DBNAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]= True
db  =  SQLAlchemy(app)
META_DATA = MetaData(bind=db.engine)


class Test(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)

print(META_DATA.tables)
'''
class PersonalInfo(db.Model):
    
   # __table__ = META_DATA.tables['PersonalInfo']
'''

print(db.engine.table_names())
@app.route('/')
def home():
    return jsonify(dumb = True)

@app.route('/validate', methods=['POST'])
def login():
    user = request.json.get('username',None)
    passw = request.json.get('password', None)
    login = Test.query.filter(Test.username==user, Test.password == passw).first()
    if not login is None:
        session['username'] = user
        return jsonify(success=True)
    else:
        return jsonify(success = False)
@app.route('/checksession')
def check_session():
    return jsonify(succcess= True) if session.get('username', False) else jsonify(succcess= False)
@app.route('/logout')
def logout():
    session.pop('username',None)
    return redirect(url_for('home'))