import React from "react";
import { connect } from "react-redux";

import { logout } from '../actions/authActions';
import Header from '../components/Header';

const DashboardPage = (props) => {
  

  return (
    <div>
      <Header userName={props.user.userName} logout={() => props.logout()} />
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.error,
  };
};

export default connect(mapStateToProps, { logout })(DashboardPage);
