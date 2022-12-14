import { CartItem, CART_ACTION_TYPES } from "./cart-types";
import { AnyAction } from "redux";
import { setCartItems,  setIsCartOpen} from "./cart-action";
import { stat } from "fs";


export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}
export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
    // cartCount: 0,
    // cartTotal:0
}

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction) : CartState => {
    if(setIsCartOpen.match(action)){
        return{...state, isCartOpen: action.payload};
    }
    if(setCartItems.match(action)){
        return{...state, cartItems: action.payload}
    }
    return state;

}

