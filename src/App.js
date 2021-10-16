import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Team from './components/Team/Team';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
        <Navigation/>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/projects' component={Home} />
            <Route exact path='/team' component={Team} />
        </Switch>
    </>
  );
}

export default App;
