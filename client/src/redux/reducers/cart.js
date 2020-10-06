import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SET_LOADING, SET_ERROR } from '../types/cart';

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case ADD_TO_CART:
            const item = action.payload;
            const product = state.cartItems.find((product) => product.product === item.product);
            if (product) {
                return {
                    cartItems: state.cartItems.map((product) =>
                        product.product === item.product ? item : product,
                    ),
                    loading: false,
                    error: null,
                };
            }
            return {
                cartItems: [...state.cartItems, item],
                loading: false,
                error: null,
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== action.payload),
                error: null,
            };
        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
                error: null,
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

export default cart;
