import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './pages/LoginPage';

function App() {
  return (
    <main>
        <Switch>
            <Route exact path='/'>
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login" component={LoginPage} />
        </Switch>
    </main>
  );
}

export default App;
