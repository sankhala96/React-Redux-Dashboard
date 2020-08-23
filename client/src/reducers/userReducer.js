import { SET_EDIT, EDIT_SUCCESS, EDIT_FAIL, FETCHED_ALLUSERS } from '../actions/types';

const initialState = {
    edit: false,
    allUsers: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_EDIT:
            return {
                ...state,
                edit: action.payload
            };
        case EDIT_SUCCESS:
        case EDIT_FAIL:
            return {
                ...state,
                edit: false
            }
        case FETCHED_ALLUSERS:
            return {
                ...state,
                allUsers: action.payload
            }
        default:
            return state;
    }
}