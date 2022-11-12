import {combineReducers} from 'redux';
import { userReducer } from './userReducer/user-reducer';
import { categoriesReducer } from './categoriesReducer/category-reducer';
import { cartReducer } from './cartReducer/cart-reducer';

// hovering over roorReducer shows each reducer returns their state and we dont need to type the root reducer again
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
})