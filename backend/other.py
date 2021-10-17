from sklearn import preprocessing
from keras.models import Sequential
from keras.layers import Dense
from keras.callbacks import EarlyStopping

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import seaborn as sns


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
