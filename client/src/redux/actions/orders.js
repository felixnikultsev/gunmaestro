import axios from 'axios';
import {
    SET_LOADING,
    SET_ORDERS,
    SAVE_ORDER,
    SET_ERROR,
    SET_CURRENT_ORDER,
    REMOVE_ORDER,
} from '../types/orders';
import { saveProduct } from './products';

const setLoading = () => ({ type: SET_LOADING });
const setOrders = (orders) => ({ type: SET_ORDERS, payload: orders });
const setCurrentOrder = (order) => ({ type: SET_CURRENT_ORDER, payload: order });
const removeOrder = (orderId) => ({ type: REMOVE_ORDER, payload: orderId });
const saveOrder = (order) => ({ type: SAVE_ORDER, payload: order });
const setError = (error) => ({ type: SET_ERROR, payload: error });

export const createOrder = (order) => async (dispatch, getState) =>
    new Promise(async (resolve, reject) => {
        dispatch(setLoading());
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.post('/api/orders', order, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            data.order.orderItems.forEach(async (item) => {
                const { data } = await axios.put(
                    `/api/products/${item.product}`,
                    { countInStock: item.countInStock - item.quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    },
                );
                dispatch(saveProduct(data.product));
            });
            dispatch(saveOrder(data.order));
            resolve();
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
            reject();
        }
    });

export const getOrders = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const {
            auth: { user },
        } = getState();
        const { data } = await axios.get('/api/orders', {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch(setOrders(data.orders));
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

export const getMyOrders = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const {
            auth: { user },
        } = getState();
        const { data } = await axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch(setOrders(data.orders));
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

export const getCurrentOrder = (orderId) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const {
            auth: { user },
        } = getState();
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch(setCurrentOrder(data.order));
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

export const deleteOrder = (orderId) => async (dispatch, getState) =>
    new Promise(async (resolve, reject) => {
        dispatch(setLoading());
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.delete(`/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch(removeOrder(data._id));
            resolve();
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
            reject();
        }
    });
