import axios from 'axios';
import { returnError } from './errorActions';

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
export const register = ({ email, userName, password }) => dispatch => {
    // Header
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Req Body
    const body = JSON.stringify({ email, userName, password });

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

export const tokenConfig = getState => {
    
    //Get token from localstorage
    const token = getState().auth.token;

    // Header
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // If token add to header
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}