import {
    SET_LOADING,
    SET_ERROR,
    SAVE_ORDER,
    SET_ORDERS,
    SET_CURRENT_ORDER,
    REMOVE_ORDER,
} from '../types/orders';

const initialState = {
    orders: [],
    currentOrder: {},
    loading: false,
    error: null,
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SAVE_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.payload],
                loading: false,
                error: null,
            };
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false,
                error: null,
            };
        case SET_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: action.payload,
                loading: false,
                error: null,
            };
        case REMOVE_ORDER:
            return {
                order: state.orders.filter((order) => order._id !== action.payload),
                currentOrder: state.currentOrder._id !== action.payload ? state.currentOrder : {},
                loading: false,
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

export default orders;
