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
            dispatch(returnError( err.response.data, err.response.status ))
            dispatch({
                type: AUTH_ERROR,
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