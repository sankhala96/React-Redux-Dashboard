import axios from 'axios';
import { returnError } from './errorActions';
import { tokenConfig } from './tokenConfig';
import { POST_LOADED } from './types';

export const getPosts = (limit) => (dispatch, getState) => {

    axios.get(`/api/posts?skip=${limit}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: POST_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnError( err.response.data.msg, err.response.status, 'POST_FETCH_FAIL' ))
        })
}