import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Components
import Auth from './components/Auth';
import Admin from './components/Admin';
import Store from './components/Store';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route path='/store/:storeName'>
          <Store />
        </Route>
        <Route path='/'>
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
