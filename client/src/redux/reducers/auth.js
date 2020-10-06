import { SET_LOADING, SET_USER, SET_ERROR, LOGOUT } from '../types/auth';

const initialState = {
    user: {},
    loading: false,
    error: null,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_USER:
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case LOGOUT:
            return {
                ...state,
                user: {},
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default auth;
