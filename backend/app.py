from flask import Flask, Response
from flask import request,session,jsonify,redirect,url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import URL
from sqlalchemy import MetaData,Table
from sqlalchemy.orm import sessionmaker
from collections import defaultdict
import uuid
import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
import matplotlib.image as mpimg
import random
import json
from flask_cors import CORS
# Google Cloud SQL (change this accordingly)
PASSWORD ="cohen0731"
PUBLIC_IP_ADDRESS ="35.224.73.35"
DBNAME ="datathon"
PROJECT_ID ="geometric-rex-329215"
INSTANCE_NAME ="datathon-db"
 
app= Flask(__name__)
app.secret_key = uuid.uuid4().hex
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://root:{PASSWORD}@{PUBLIC_IP_ADDRESS}:3306/{DBNAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]= True
db = SQLAlchemy(app)
db.init_app(app)
meta = MetaData()
Session = sessionmaker(bind = db.engine)
sessions = Session()

class Test(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)

class PersonalInfo(db.Model):  
    __table__ = Table('PersonalInfo', meta, autoload = True, autoload_with=db.engine)

def averages(rows):
    lisd = []
    for j in rows[0].__dict__.keys():
        avg = 0
        classify = defaultdict(int)
        dicts = vars(rows[0])
        if((type(dicts[j]) == int or type(dicts[j]) == float) and j != 'ID'):
            for i in rows:
                avg += vars(i)[j]
            lisd.append([j, avg/len(rows)])
        elif(type(dicts[j]) == str and j != "Name"):
            for i in rows:
                classify[vars(i)[j]] += 1
            classify["total"] = len(rows)
            lisd.append([j, classify])
    return lisd
@app.route('/plots', methods=['POST'])
def plotting():
    lists = averages(sessions.query(PersonalInfo).all())
    if(not request.json.get("person", None)):
        return jsonify(success=False)
    person = request.json.get("person")
    obj = sessions.query(PersonalInfo).filter(PersonalInfo.Name == person).one()
    dicts = obj.__dict__
    b64 = []
    for i in lists:
        if(type(i[1]) == float):
            package = [i[1],dicts[i[0]]]
            rgb = [(random.random(), random.random(), random.random()) for i in range(2)]
            plt.yticks(np.arange(0,max(package) * 1.5, step=max(package)/5))
            imgs = plt.bar([person, "Average"],package,align='center', color=rgb)
            my_stringIObytes = io.BytesIO()
            plt.savefig(my_stringIObytes, format='jpg')
            my_stringIObytes.seek(0)
            my_base64_jpgData = base64.b64encode(my_stringIObytes.read()).decode('utf-8')
            b64.append(my_base64_jpgData)
    return Response(json.dumps(b64),  mimetype='application/json')


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