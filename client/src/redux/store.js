import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import rootReducer from './reducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const user = Cookie.getJSON('userInfo') || {};

const initialState = {
    cart: {
        cartItems,
    },
    auth: {
        user,
    },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
