import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';
import { Link, useHistory } from 'react-router-dom';

import { login } from '../actions/authActions';
import { clearError } from '../actions/errorActions';

let LoginPage = (props) => {
    const history = useHistory();
    const [values, updateValues] = useState({
        email: '',
        password: '',
    });
    const [ errorMsg, setError ] = useState(null)

    const prevErrorRef = useRef(props.error)

    // Set Error on Prop change
    useEffect(() => {
        if(props.error !== prevErrorRef) {
            // Check for Register Error
            if(props.error.id === 'LOGIN_FAIL') {
                setError(props.error.msg);
            }
            else {
                setError(null);
            }
        }
    }, [props.error])

    const handleChange = (e) => {
        updateValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.login(values)
        updateValues({
            email: '',
            password: '',
        })
    }

    if(props.isAuthenticated) {
        props.clearError()
        history.push(`/${props.user.userName}`);
    }

    return (
        <div className='auth-page'>
            <div className='auth-page-container'>
                { errorMsg ? <span className="error-msg">{errorMsg}</span> : null }
                <form onSubmit={handleSubmit}>
                    <div className='form-field'>
                        <span>Email</span>
                        <input
                            placeholder='Enter Email'
                            name='email'
                            onChange={handleChange}
                            value={values.email}
                        />
                    </div>
                    <div className='form-field'>
                        <span>Password</span>
                        <input
                            placeholder='Enter Password'
                            name='password'
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-field-button'>
                        <button type='submit'>Login</button>
                        <div className='form-redirect'>
                            <span>New User?</span>
                            <Link to='/register'>Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
      error: state.error
    }
}

LoginPage = connect(mapStateToProps, { login, clearError })(LoginPage)

export default LoginPage;