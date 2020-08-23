import axios from 'axios';
import { returnError } from './errorActions';
import { tokenConfig } from './tokenConfig';
import { SET_EDIT, EDIT_SUCCESS, EDIT_FAIL, USER_LOADED, FETCHED_ALLUSERS } from './types';

export const setEdit = ( edit ) => {
    return {
        type: SET_EDIT,
        payload: edit
    }
}

// Get All Users
export const getAllUser = () => (dispatch, getState) => {

    axios.get('/api/users/allUsers', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: FETCHED_ALLUSERS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnError( err.response.data.msg, err.response.status, 'POST_FETCH_FAIL' ))
        })
}

// Update User Info
export const saveChanges = ({ fullName, status }) => (dispatch, getState) => {

    // Req Body
    const body = JSON.stringify({ fullName, status });

    axios.post('/api/users/updateProfile', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EDIT_SUCCESS,
            })
            dispatch({
                type: USER_LOADED,
                payload: res.data.user
            })
        })
        .catch(err => {
            dispatch(returnError( err.response.data.msg, err.response.status, 'EDIT_FAIL' ))
            dispatch({
                type: EDIT_FAIL
            })
        })
}