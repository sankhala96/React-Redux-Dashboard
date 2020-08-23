import React from "react";
import { connect } from "react-redux";
import './Dashboard.css'

import { logout } from '../actions/authActions';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Posts from '../components/Posts';
import Connections from '../components/Connections';

const DashboardPage = (props) => {
  

  return (
    <div>
      <Header userName={props.user.userName} logout={() => props.logout()} />
      <div className='content'>
        <Profile user={props.user}/>
        <Posts />
        <Connections />
      </div>
      <div className='footer'></div>
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
