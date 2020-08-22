import React from 'react';
import { connect } from 'react-redux';

const DashboardPage = (props) => {
    return(
    <div>{props.user.userName}</div>
    )
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
      error: state.error
    }
}

export default connect(mapStateToProps)(DashboardPage)