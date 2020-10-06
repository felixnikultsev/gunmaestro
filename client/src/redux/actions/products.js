import axios from 'axios';
import {
    SET_LOADING,
    SET_PRODUCTS,
    SET_ERROR,
    SET_CURRENT_PRODUCT,
    SAVE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    SET_CATEGORY,
    SET_SEARCH_KEYWORD,
} from '../types/products';

const setLoading = () => ({ type: SET_LOADING });
const setProducts = (products) => ({ type: SET_PRODUCTS, payload: products });
const setCurrentProduct = (product) => ({ type: SET_CURRENT_PRODUCT, payload: product });
const setError = (error) => ({ type: SET_ERROR, payload: error });
const deleteProductSuccess = (productId) => ({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
const setCategory = (category) => ({ type: SET_CATEGORY, payload: category });

export const setSearchKeyword = (searchKeyword) => ({
    type: SET_SEARCH_KEYWORD,
    payload: searchKeyword,
});

export const saveProduct = (product) => ({ type: SAVE_PRODUCT, payload: product });

export const getProducts = (categoryName = '', searchKeyword = '') => async (
    dispatch,
    getState,
) => {
    const {
        products: { category },
    } = getState();
    dispatch(setLoading());
    categoryName = categoryName == null ? category : categoryName;
    dispatch(setCategory(categoryName));
    dispatch(setSearchKeyword(searchKeyword));
    try {
        const { data } = await axios.get(
            `/api/products?category=${categoryName}&searchKeyword=${searchKeyword}`,
        );
        dispatch(setProducts(data.products));
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

export const getCurrentProduct = (productId) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch(setCurrentProduct(data.product));
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

export const saveNewProduct = (product) => (dispatch, getState) =>
    new Promise(async (resolve, reject) => {
        dispatch(setLoading());
        const {
            auth: { user },
        } = getState();

        try {
            if (!product._id) {
                const { data } = await axios.post('api/products', product, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                dispatch(saveProduct(data.product));
            } else {
                const { data } = await axios.put(`/api/products/${product._id}`, product, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                dispatch(saveProduct(data.product));
            }
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

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch(setLoading());
    const {
        auth: { user },
    } = getState();

    try {
        await axios.delete(`api/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch(deleteProductSuccess(productId));
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
