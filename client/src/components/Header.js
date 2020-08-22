import React from 'react';

const Header = ( props ) => {
    return (
        <div className='header'>
            <span>{props.userName}</span>
            <button onClick={props.logout}>Logout</button>
        </div>
    )
}

export default Header;
