import { POST_LOADED } from '../actions/types';

const initialState = {
    posts: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case POST_LOADED:
            return {
                posts: [...state.posts, ...action.payload]
            };
        default:
            return state;
    }
}