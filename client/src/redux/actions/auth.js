import axios from 'axios';
import Cookie from 'js-cookie';
import { SET_LOADING, SET_USER, SET_ERROR, LOGOUT } from '../types/auth';

const setLoading = () => ({ type: SET_LOADING });
const setUser = (data) => ({ type: SET_USER, payload: data });
const setError = (error) => ({ type: SET_ERROR, payload: error });
const logoutSuccess = () => ({ type: LOGOUT });

export const register = (name, email, password) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post('/api/users/register', { name, email, password });
        dispatch(setUser(data.user));
        Cookie.set('userInfo', JSON.stringify(data.user));
    } catch (error) {
        if (error.response) {
            if (error.response.data.errors) {
                dispatch(setError(error.response.data.errors[0].msg));
            } else {
                dispatch(setError(error.response.data.message));
            }
        } else {
            dispatch(setError(error.message));
        }
    }
};

export const login = (email, password) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post('/api/users/auth', { email, password });
        dispatch(setUser(data.user));
        Cookie.set('userInfo', JSON.stringify(data.user));
    } catch (error) {
        if (error.response) {
            dispatch(setError(error.response.data.message));
        } else {
            dispatch(setError(error.message));
        }
    }
};

export const update = ({ id, name, email, password }) => async (dispatch, getState) => {
    const {
        auth: { user },
    } = getState();
    dispatch(setLoading());
    try {
        const { data } = await axios.put(
            `/api/users/${id}`,
            { name, email, password },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            },
        );
        dispatch(setUser(data.user));
        Cookie.set('userInfo', JSON.stringify(data.user));
    } catch (error) {
        if (error.response) {
            if (error.response.data.errors) {
                dispatch(setError(error.response.data.errors[0].msg));
            } else {
                dispatch(setError(error.response.data.message));
            }
        } else {
            dispatch(setError(error.message));
        }
    }
};

export const logout = () => (dispatch) => {
    Cookie.remove('userInfo');
    dispatch(logoutSuccess());
};
