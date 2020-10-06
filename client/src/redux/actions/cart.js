import axios from 'axios';
import Cookie from 'js-cookie';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SET_LOADING, SET_ERROR } from '../types/cart';

const setLoading = () => ({ type: SET_LOADING });
const addToCart = (item) => ({ type: ADD_TO_CART, payload: item });
const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId });
const clearCart = () => ({ type: CLEAR_CART });
const setError = (error) => ({ type: SET_ERROR, payload: error });

export const addItemToCart = (productId, quantity) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        const item = {
            product: data.product._id,
            model: data.product.model,
            category: data.product.category,
            price: data.product.price,
            image: data.product.image,
            countInStock: data.product.countInStock,
            quantity,
        };
        dispatch(addToCart(item));
        const {
            cart: { cartItems },
        } = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));
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

export const removeItemFromCart = (productId) => (dispatch, getState) => {
    dispatch(removeFromCart(productId));
    const {
        cart: { cartItems },
    } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
};

export const clearCartItems = () => (dispatch, getState) => {
    dispatch(clearCart());
    const {
        cart: { cartItems },
    } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
};
