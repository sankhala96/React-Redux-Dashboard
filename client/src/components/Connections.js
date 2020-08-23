import React, { useState, useEffect } from 'react';
import './Connections.css';

import LoadingComponent from './LoadingComponent';
import { getAllUser } from '../actions/userActions';
import { connect } from 'react-redux';

const UserCard = (props) => {
    return (
        <div className='connection-card'>
            <img alt="logo" src={process.env.PUBLIC_URL + "/user.PNG"} />
            <span>{props.user.fullName}</span>
        </div>
    )
}

const Connections = ( props ) => {
    const [ searchKey, updateKey ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ usersArr, updateAllUsers ] = useState(props.allUsers)
    
    useEffect(() => {
      updateAllUsers(props.allUsers);
      setLoading(false);
    }, [props.allUsers]);

    useEffect(() => {
      props.getAllUser();
    }, []);

    const filterUserArr = () => {
      const lowerCaseKey = searchKey.toLowerCase();
      const filteredArr = props.allUsers.filter(user => {
        if (user.userName.toLowerCase().includes(lowerCaseKey) || user.fullName.toLowerCase().includes(lowerCaseKey)) {
          return true;
        }

        return false;
      });
      console.log(filteredArr)
      updateAllUsers(filteredArr);
    }
    
    return (
      <div className="connections">
        <div className="connections-search">
          <input
            name="search"
            placeholder="Search Connections"
            value={searchKey}
            onChange={(e) => updateKey(e.target.value)}
          />
          <button onClick={filterUserArr}>Go</button>
        </div>
        {
          loading ? (
            <LoadingComponent />
          )
          :
          (
            <div className="connections-list">
            {usersArr && usersArr.map((user, idx) => {
              return <UserCard key={`${user}-${idx}`} user={user}/>
            })}
        </div>
          )
        }
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.userActions.allUsers
  };
}; 

export default connect(mapStateToProps, { getAllUser })(Connections);