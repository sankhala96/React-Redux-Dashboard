import React, { useState } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';
import { Link } from 'react-router-dom';

let LoginPage = ({ dispatch }) => {
    const [values, updateValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        updateValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        updateValues({
            email: '',
            password: '',
        })
        console.log(values)
    }

    return (
        <div className='auth-page'>
            <div className='auth-page-container'>
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
      error: state.error
    }
  }
  
// const mapDispatchToProps = dispatch => {
//     return {
//       onTodoClick: id => {
//         dispatch(toggleTodo(id))
//       }
//     }
// }

LoginPage = connect(mapStateToProps, {})(LoginPage)

export default LoginPage;