import {useState} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Patients from './components/Patients/Patients';
import Calendar from './components/Calendar/Calendar';
import Interactive from './components/Experimental/Experimental';
import LoginContext from "./LoginContext";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const loggedIn = useState(false);

    return (
        <>
            <LoginContext.Provider value={loggedIn}>
                <Navigation />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/patients' component={Patients} />
                    <Route exact path='/calendar' component={Calendar} />
                    <Route exact path='/interactive' component={Interactive} />
                </Switch>
            </LoginContext.Provider>
        </>
    );
}

export default App;
