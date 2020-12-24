import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Components
import Admin from './components/Admin';
import Store from './components/Store';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <Admin />
        </Route>
        <Route path='/'>
          <Store />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
