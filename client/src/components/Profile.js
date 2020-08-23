import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import './Profile.css';

import { setEdit, saveChanges } from '../actions/userActions';

const Profile = ( props ) => {
    const {fullName, status} = props.user;
    const [values, updateValues] = useState({
        fullName: fullName,
        status: status
    }); 
    const edit = props.userActions.edit;

    const handleChange = (e) => {
        updateValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const cancelEdit = () => {
        updateValues({
            fullName: fullName,
            status: status
        })
        props.setEdit(false)
        history.push(`/${props.user.userName}`);
    }

    const saveChanges = () => {
        props.saveChanges(values);
    }

    const history = useHistory();
    if(edit) {
        history.push(`/${props.user.userName}/edit`);
    }

    return (
        <div className='profile'>
            <div className='profile-details'>
                <img alt="logo" src={process.env.PUBLIC_URL + "/user.PNG"} />
                {
                    !edit ? (
                        <div>
                            <span>{fullName}</span>
                            <p>{status}</p>
                        </div>
                    )
                    : (
                        <div>
                            <input
                            placeholder='Enter Full Name'
                            name='fullName'
                            value={values.fullName}
                            onChange={handleChange}
                            />
                            <input
                            placeholder='Enter Status'
                            name='status'
                            value={values.status}
                            onChange={handleChange}
                            />
                            <button onClick={saveChanges}>Save</button>
                            <button onClick={cancelEdit}>Cancel</button>
                        </div>    
                    )
                }
            </div>
            <div className='profile-edit'>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faNewspaper} />
                        My Posts
                    </li>
                    {
                        !edit ? (<li onClick={() => {
                            props.setEdit(true)
                        }}>
                        <FontAwesomeIcon icon={faEdit} />
                        Edit account details
                    </li>) : null
                    }
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      userActions: state.userActions
    };
}; 

export default  connect(mapStateToProps, { setEdit, saveChanges })(Profile);
