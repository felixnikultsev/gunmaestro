import {
    SET_LOADING,
    SET_PRODUCTS,
    SET_CURRENT_PRODUCT,
    SET_ERROR,
    SAVE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    SET_CATEGORY,
    SET_SEARCH_KEYWORD,
} from '../types/products';

const initialState = {
    products: [],
    currentProduct: {},
    categoryNames: {
        rifle: 'Винтовка',
        shotgun: 'Дробовик',
        pistol: 'Пистолет',
    },
    category: '',
    searchKeyword: '',
    loading: false,
    error: null,
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };
        case SET_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: action.payload,
                loading: false,
                error: null,
            };
        case SAVE_PRODUCT:
            const newProduct = action.payload;
            const hasProduct = state.products.find((product) => product._id === newProduct._id);

            if (hasProduct) {
                return {
                    ...state,
                    products: state.products.map((product) =>
                        product._id === newProduct._id ? newProduct : product,
                    ),
                    loading: false,
                    error: null,
                };
            }

            return {
                ...state,
                products: [...state.products, newProduct],
                loading: false,
                error: null,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter((product) => product._id !== action.payload),
                loading: false,
                error: null,
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload,
            };
        case SET_SEARCH_KEYWORD:
            return {
                ...state,
                searchKeyword: action.payload,
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

export default products;
