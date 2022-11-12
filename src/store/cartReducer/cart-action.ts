import { CART_ACTION_TYPES } from "./cart-types";
import {createAction} from '../../utils/reducer.utils';
import { withMatcher, ActionWithPayload } from "../../utils/reducer.utils";
import { CartItem } from "./cart-types";
import { CategoryItem } from "../categoriesReducer/category.types";


 const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem):CartItem[] => {
     //check if the itm is there
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);   
    
    //if it is there do this
    if(existingCartItem){
        return cartItems.map((cartItem) => (
            cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        ))
    }
   // if it is not

        return [...cartItems, {...productToAdd, quantity: 1}]
  
}
const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => cartItemToRemove.id === cartItem.id);
    
    if(existingCartItem && existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);

    }


    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem )
}
const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem):CartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS,CartItem[]>

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));



 export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems)
    // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);


}
export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove:CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems)
    // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);


}
export const clearItemFromCart= (cartItems: CartItem[], cartItemToClear:CartItem) => {
   const newCartItems = clearCartItem(cartItems, cartItemToClear);
   return setCartItems(newCartItems)
//    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

}
export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
 })