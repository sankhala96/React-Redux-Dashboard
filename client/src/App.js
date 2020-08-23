import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoadingComponent from './components/LoadingComponent';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { loadUser } from './actions/authActions';

const App = (props) => {
  useEffect(() => {
    props.loadUser();
  }, [])

  if(props.isLoading) {
    return (
      <LoadingComponent />
    )
  }
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/:userName" render={() => props.isAuthenticated ? (<DashboardPage />) : (<Redirect to="/login" />)} />
        <Route exact path="/:userName/edit" render={() => props.isAuthenticated ? (<DashboardPage />) : (<Redirect to="/login" />)} />
      </Switch>
    </BrowserRouter>
  );
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, { loadUser })(App);;
