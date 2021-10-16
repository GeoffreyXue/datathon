import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Patients from './components/Patients/Patients';
import Calendar from './components/Calendar/Calendar';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
        <Navigation/>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/patients' component={Patients} />
            <Route exact path='/calendar' component={Calendar} />
        </Switch>
    </>
  );
}

export default App;
