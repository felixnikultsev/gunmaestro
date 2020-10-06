import { combineReducers } from 'redux';

import products from './products';
import cart from './cart';
import auth from './auth';
import orders from './orders';

const rootReducer = combineReducers({
    products,
    cart,
    auth,
    orders,
});

export default rootReducer;
