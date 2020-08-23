import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

const Header = ( props ) => {
    return (
        <div className='header'>
            <span>{props.userName}</span>
            <button onClick={props.logout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
            </button>
        </div>
    )
}

export default Header;
