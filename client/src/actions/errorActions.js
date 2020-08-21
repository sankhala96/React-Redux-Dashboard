import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return Errors
export const returnError = ( msg, status, id= null ) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}

// Clear Error
export const clearError = () => {
     return {
         type: CLEAR_ERRORS
     }
}