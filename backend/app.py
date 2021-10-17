from flask import Flask, Response
from flask import request,session,jsonify,redirect,url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import URL
from sqlalchemy import MetaData,Table
from sqlalchemy.orm import sessionmaker
from collections import defaultdict
import uuid
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
import io
import base64
import matplotlib.image as mpimg
import random
import simplejson as json
from flask_cors import CORS
import pandas as pd
import keras
import sklearn
from sklearn import preprocessing
from keras.models import Sequential
from keras.layers import Dense
from keras.callbacks import EarlyStopping

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import seaborn as sns
'''
Aiden was here  
{\__/}
( • . •)
/ >♥️
'''
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

class Test(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)

class PersonalInfo(db.Model):  
    __table__ = Table('PersonalInfo', meta, autoload = True, autoload_with=db.engine)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

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
    lists = averages(PersonalInfo.query.all())
    if(not request.json.get("person", None)):
        return jsonify(success=False)
    person = request.json.get("person")
    obj = PersonalInfo.query.filter(PersonalInfo.Name == person).one()
    dicts = obj.__dict__
    b64 = []
    for i in lists:
        if(type(i[1]) == float):
            package = [dicts[i[0]], i[1]]
            rgb = [(random.random(), random.random(), random.random()) for i in range(2)]
            plt.yticks(np.arange(0,max(package) * 1.5, step=max(package)/5))
            ax = plt.bar([person, "Average"],package,align='center', color=rgb)
            plt.title(i[0])
            my_stringIObytes = io.BytesIO()
            plt.savefig(my_stringIObytes, format='jpg')
            my_stringIObytes.seek(0)
            my_base64_jpgData = base64.b64encode(my_stringIObytes.read()).decode('utf-8')
            b64.append(my_base64_jpgData)
            plt.close() 
        else:
            total = i[1].pop("total")
            
            package = [[a,b] for a,b in i[1].items()]
            rgb = [(random.random(),random.random(),random.random()) for k in range(len(i[1]))]
            labels = []
            x = []
            for j in package:
                if(j[0] == dicts.get(i[0], None)):
                    labels.append(j[0] + "*")
                    x.append(j[1])
                else:
                    x.append(j[1])
                    labels.append(j[0])
            plt.pie(x,labels = labels, colors=rgb)
            plt.title(i[0])
            my_stringIObytes = io.BytesIO()
            plt.savefig(my_stringIObytes, format='jpg')
            my_stringIObytes.seek(0)
            my_base64_jpgData = base64.b64encode(my_stringIObytes.read()).decode('utf-8')
            b64.append(my_base64_jpgData)
            plt.close() 
            
    return Response(json.dumps(b64),  mimetype='application/json')

@app.route('/page', methods=['POST'])
def page():
    if(not request.json.get('pages', None)):
        return jsonify(success = False)
    pages = request.json.get('pages')
    lists = PersonalInfo.query.filter(PersonalInfo.ID > 3*(pages-1), PersonalInfo.ID <= (pages) * 3  )
    good = [i.as_dict() for i in lists]
    if((pages)*3 >= PersonalInfo.query.count()):
        good.append({"final" : True})
    else:
        good.append({"final" : False})
    
    return Response(json.dumps(good, use_decimal=True), mimetype= 'application/json')

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
'''
def heartmodel(id):
  obj = PersonalInfo.query.filter(PersonalInfo.ID == id).one()
  df = obj.__dict__
  print(df)
  heart = pd.read_csv("heart_combined.csv")
  from sklearn.model_selection import train_test_split
  X_temp, X_test, y_temp, y_test = \
  train_test_split(x, y, test_size=0.3, shuffle=True, random_state=1, stratify=y)
  X_train, X_valid, y_train, y_valid = \
  train_test_split(X_temp, y_temp, test_size=0.3,
  shuffle=True, random_state=1, stratify=y_temp)

  from sklearn.preprocessing import StandardScaler
  scaler = StandardScaler().fit(X_train)

  X_train = scaler.transform(X_train)
  X_test = scaler.transform(X_test)

  model = Sequential()
  model.add(Dense(16, input_shape=(x.shape[1],), activation='relu'))
  model.add(Dense(16, activation='relu'))
  model.add(Dense(1, activation='sigmoid'))

  model.summary()


  model.compile(optimizer='Adam',
                loss='binary_crossentropy',
                metrics=['accuracy'])

  
  es = EarlyStopping(monitor='val_accuracy',
                                    mode='max',
                                    patience=10,
                                    restore_best_weights=True)


  history = model.fit(X_train,
                      y_train,
                      callbacks=[es],
                      epochs=80,
                      batch_size=10,
                      validation_split=0.2,
                      shuffle=True,
                      verbose=1)

  model.predict(X_test)
'''
    
