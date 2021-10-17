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
import pandas as pd
import io
import base64
import matplotlib.image as mpimg
import random
import simplejson as json
from flask_cors import CORS
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
class Test(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)

class PersonInfo(db.Model):  
    __table__ = Table('PersonInfo', meta, autoload = True, autoload_with=db.engine)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class PersonHeartDisease(db.Model):  
    __table__ = Table('PersonHeartDisease', meta, autoload = True, autoload_with=db.engine)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class PersonBreastCancer(db.Model):  
    __table__ = Table('PersonBreastCancer', meta, autoload = True, autoload_with=db.engine)
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


def averages2(dict_array):
    lisd = []
    for j in dict_array[0].keys():
        avg = 0
        classify = defaultdict(int)
        dicts = dict_array[0]
        if((type(dicts[j]) == int or type(dicts[j]) == float) and j != 'ID'):
            for i in dict_array:
                avg += dict_array[i][j]
            lisd.append([j, avg/len(dict_array)])
        elif(type(dicts[j]) == str and j != "Name"):
            for i in dict_array:
                classify[dict_array[i][j]] += 1
            classify["total"] = len(dict_array)
            lisd.append([j, classify])
    return lisd

@app.route('/plots', methods=['POST'])
def plotting():
    # averages all column values
    lists = []
    for x, y, z in db.session.query(PersonInfo, PersonBreastCancer, PersonHeartDisease) \
            .filter(PersonInfo.ID == PersonBreastCancer.id, PersonInfo.ID == PersonHeartDisease.id).all():
        x.__dict__.update(y.__dict__)
        x.__dict__.update(z.__dict__)
        lists.append(x.__dict__) 
        
    lists = averages2(lists)

    if(not request.json.get("person", None)):
        return jsonify(success=False)
    person = request.json.get("person")
    # gets one person column
    obj = []
    for x, y, z in db.session.query(PersonInfo, PersonBreastCancer, PersonHeartDisease) \
            .filter(PersonInfo.ID == PersonBreastCancer.id, PersonInfo.ID == PersonHeartDisease.id).one():
        x.__dict__.update(y.__dict__)
        x.__dict__.update(z.__dict__)
        obj = x
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
    lists = PersonInfo.query.filter(PersonInfo.ID > 3*(pages-1), PersonInfo.ID <= (pages) * 3  )
    good = [i.as_dict() for i in lists]
    res = {
        'data': good,
        'final': False
    }

    if((pages)*3 >= PersonInfo.query.count()):
        res['final'] = True
    
    return Response(json.dumps(res, use_decimal=True), mimetype= 'application/json')

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

from sklearn import preprocessing
from keras.models import Sequential
from keras.layers import Dense
from keras.callbacks import EarlyStopping

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import seaborn as sns

def filters(df):
    le = preprocessing.LabelEncoder()
    for i in df.columns:
      if(i == "Oldpeak"):
          pass
      elif(df[i].dtype == object):
        encode = le.fit_transform(df[i])
        df[i] = encode
    return df

from copy import deepcopy

def heartmodel(IDS):
    if(IDS == None):
        return

    obj = PersonHeartDisease.query.filter(PersonHeartDisease.id == IDS).one()

    dicts = deepcopy(obj.__dict__)
    heart1 = pd.read_csv("heart.csv")
    heart2 = pd.read_csv("heart2.csv")
    del heart2['ca']
    del heart2['thal']
    heart2 = heart2[['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs','restecg', 'thalach', 'exang','oldpeak','slope', 'target']]

    heart2.columns = ['Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol', 'FastingBS',
       'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope',
       'HeartDisease']
    for i in obj.__dict__.keys():
        if not i in heart2.columns:
            dicts.pop(i)
    df = {i : [j] for i,j in dicts.items()}
    df = pd.DataFrame.from_dict(df)
    df = df[heart1.columns]
  
    # converts all categorical variables to numerical ones
    df["unique"] = 1
    heart1["unique"] = 0
    hearttest = filters(heart1.append(df))
    heart1 = filters(heart1)
    df = hearttest.loc[hearttest["unique"] == 1]
    del heart1["unique"]
    del df["unique"]

    # combine heart1 and heart2 into one csv
    with open("heart_combined.csv","w") as files:
        heart1 = heart1.append(heart2)
        heart1.to_csv(files, header = heart1.columns)
    heart = pd.read_csv("heart_combined.csv", index_col=0)
    df = np.array(df[df.columns[:11]])
    df = df.astype(float)
    print(df)
    x = np.array(heart[heart.columns[:11]])  
    y = np.array(heart1.loc[:, 'HeartDisease'])
    from sklearn.model_selection import train_test_split
    X_temp, X_test, y_temp, y_test = \
    train_test_split(x, y, test_size=0.5, shuffle=True, random_state=1, stratify=y)
    X_train, X_valid, y_train, y_valid = \
    train_test_split(X_temp, y_temp, test_size=0.5,
    shuffle=True, random_state=1, stratify=y_temp)

    from sklearn.preprocessing import StandardScaler
    scaler = StandardScaler().fit(X_train)

    X_train = scaler.transform(X_train)
    X_test = scaler.transform(X_test)   

    model = Sequential()
    model.add(Dense( 16 , input_dim= 11, activation='relu'))
    model.add(Dense(16, activation='relu'))
    model.add(Dense(1, activation='sigmoid'))


    model.compile(optimizer='Adam',
                loss='binary_crossentropy',
                metrics=['accuracy'])

    
    es = EarlyStopping(monitor='val_loss',
                                    mode='max',
                                    patience=10,
                                    restore_best_weights=True)
    
    history = model.fit(X_train,
                      y_train,
                      callbacks=[es],
                      epochs=200,
                      batch_size=20,    
                      validation_split=0.2,
                      shuffle=True,
                      verbose=0)
    
    print("MODEL PREDICTION")
    print(model.predict(df)[0][0])

    user = PersonHeartDisease.query.filter(PersonHeartDisease.id == IDS).one()
    print("USER")
    print(user.__dict__)
    user.DiseaseProbability = model.predict(df)[0][0]
    db.session.commit()

def breastmodel(IDS):
    if(IDS == None):
        return

    # Grabs copy of person and the breast data
    obj = PersonBreastCancer.query.filter(PersonBreastCancer.id == IDS).one()
    dicts = deepcopy(obj.__dict__)  
    cancer = pd.read_csv("data.csv")
    cancer = cancer[['id','diagnosis',
     'radius_mean','texture_mean','perimeter_mean','area_mean','smoothness_mean',
 'compactness_mean','concavity_mean','concave_points_mean','symmetry_mean',
     'fractal_dimension_mean','radius_se','texture_se','perimeter_se','area_se',
     'smoothness_se','compactness_se','concavity_se','concave_points_se','symmetry_se',
     'fractal_dimension_se','radius_worst','texture_worst','perimeter_worst','area_worst',
     'smoothness_worst','compactness_worst','concavity_worst','concave_points_worst',
     'symmetry_worst','fractal_dimension_worst']]

    # ensure that dicts and breast have the same cols
    for i in obj.__dict__.keys():
      if not i in cancer.columns:
          dicts.pop(i)

    # converting M to 1, B to 0 in cancer map
    d = {'M': 1,'B': 0}
    cancer['diagnosis'] = cancer['diagnosis'].map(d)

    # removing null rows
    cancer = cancer.dropna(axis = 'columns')

    # all columns aside from id, diagnosis
    x = np.array(cancer[cancer.columns[2:]])
    # diagnosis column to use for testing
    y = np.array(cancer.loc[:, 'diagnosis'])
    
    # converting person to dataframe
    df = {i : [j] for i,j in dicts.items()}
    df = pd.DataFrame.from_dict(df)

    df = df[cancer.columns[2:]]
    df = df.astype(float)

    from sklearn.model_selection import train_test_split

    X_temp, X_test, y_temp, y_test = \
            train_test_split(x, y, test_size=0.4,
                            shuffle=True, random_state=1, stratify=y)

    X_train, X_valid, y_train, y_valid = \
            train_test_split(X_temp, y_temp, test_size=0.4,
                            shuffle=True, random_state=1, stratify=y_temp)
    #standardization
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
                        verbose=0)

    # model.predict(X_test)
    # np.round(model.predict(X_test),0)
    print("MODEL PREDICTION")
    print(model.predict(df)[0][0])
    user = PersonBreastCancer.query.filter(PersonBreastCancer.id == IDS).one()
    print("USER")
    print(user.__dict__)
    user.CancerProbability = model.predict(df)[0][0]
    db.session.commit()

if __name__ == "__main__":
    heartmodel(1)
    # for i in PersonInfo.query.all():
    #     print(i.__dict__.get("ID"))
    
    for i in PersonInfo.query.all():
        #heartmodel(i.ID)
        pass
    for i in PersonInfo.query.all():
        breastmodel(i.ID)
    
    # for i in PersonHeartDisease.query.all():
    #     print(i.__dict__.get("DiseaseProbability"))
