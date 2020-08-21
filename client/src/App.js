import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { loadUser } from './actions/authActions';

let App = ({ dispatch }) => {

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <main>
        <Switch>
            <Route exact path='/'>
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
        </Switch>
    </main>
  );
}

App = connect()(App);

export default App;
