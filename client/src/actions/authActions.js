import axios from 'axios';
import { returnError } from './errorActions';
import { tokenConfig } from'./tokenConfig';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnError( err.response.data.msg, err.response.status ))
            dispatch({
                type: AUTH_ERROR,
            })
        })
}

// Register User
export const register = ({ email, userName, fullName, password }) => dispatch => {

    // User Loading
    dispatch({ type: USER_LOADING });

    // Header
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Req Body
    const body = JSON.stringify({ email, userName, fullName, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnError( err.response.data.msg, err.response.status, 'REGISTER_FAIL' ))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login User
export const login = ({ email, password }) => dispatch => {

    // User Loading
    dispatch({ type: USER_LOADING });

    // Header
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Req Body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnError( err.response.data.msg, err.response.status, 'LOGIN_FAIL' ))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// Logout
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}