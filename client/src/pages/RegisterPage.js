import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';
import { Link, useHistory } from 'react-router-dom';

import { register } from '../actions/authActions';
import { clearError } from '../actions/errorActions';

let RegisterPage = (props) => {
    const history = useHistory();
    const [values, updateValues] = useState({
        email: '',
        userName: '',
        fullName: '',
        password: '',
    });
    const [ errorMsg, setError ] = useState(null)
    const prevErrorRef = useRef(props.error);

    // Set Error on Prop change
    useEffect(() => {
        if(props.error !== prevErrorRef) {
            // Check for Register Error
            if(props.error.id === 'REGISTER_FAIL') {
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

        props.register(values)
        updateValues({
            email: '',
            userName: '',
            password: '',
        })


    }

    if(props.isAuthenticated) {
        props.clearError()
        history.push(`/${props.user.userName}`);
    }

    return (
        <div className='auth-page'>
            <div className='auth-page-container register'>
                { errorMsg ? <span className="error-msg">{errorMsg}</span> : null }
                <form onSubmit={handleSubmit}>
                    <div className='form-field'>
                        <span>Email</span>
                        <input
                            placeholder='Enter Email'
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-field'>
                        <span>User Name</span>
                        <input
                            placeholder='Enter User Name'
                            name='userName'
                            value={values.userName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-field'>
                        <span>Full Name</span>
                        <input
                            placeholder='Enter Full Name'
                            name='fullName'
                            value={values.fullName}
                            onChange={handleChange}
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
                        <button type='submit'>Register</button>
                        <div className='form-redirect'>
                            <span>Already a User?</span>
                            <Link to='/login'>Login</Link>
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

RegisterPage = connect(mapStateToProps, { register, clearError })(RegisterPage)

export default RegisterPage;