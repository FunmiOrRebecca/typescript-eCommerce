import {createSelector} from 'reselect';
import { CartState } from './cart-reducer';
import { RootState } from '../store';

const selectCartReducer = (state: RootState) : CartState => state.cart;

// We know that what we are getting from the selectCartReducer is the CartState
// So we import the cart state
export const selectCartItems = createSelector(
    [selectCartReducer], (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer], (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems], (cartItems) => cartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems], (cartItems) => cartItems.reduce((total, cartItem) => (total + cartItem.quantity * cartItem.price), 0)
)


// steps to replace the reducer now 
// 1. Remove Cart Provider from Index JS
// 2. figure out where cart contxt is being called inside of the appication and slowly migrate it to the action and selectors
// 3. Navigation Component
// 4 get rid of everything related to the cart useContext
// 5. import all the things you need
// import {selectIsCartOpen}
// inside const Navigation
// change const {isCartOpen} = useconte... to const isCartOpen = useSelector(selectIsCartOpen);
//cart icon next remove anything related to cart context 
//import useDispatch, useSelctor
//import {selectIsCartOpen, selectIsCartCount} 
//import {setIsCartopen}
//remover const {isCartOpen, setIscart}...
// const dispatch = useDispatch()
//replace const cartCount = useSelctor(selectCartCout);
// const isCartOpen = useSelector(selectIsCartOpen);
//const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
//cart dropdown component
//remove imports to cotext bla bla bla
//import useSelector
//import {selectCartItems}
//const cartItems = useSelector(selectCartItems)
//product card 
//import useDispatch
//import addItemToCart
//const dispatch = useDispatch();
//add dispatch( to the addItem To caart)
//import useSelctor
//import {selectCartItems}
//const cartItems = useSelctor(selectartItems) put it in between dispatch and name or after
//pass cartItems besides product
//check out 
//revove cart contex
///import {useSelctor}
//import {selectCartItems, selectCartTotal}
// replace cost{cartItems}
// const cartItems = useSelector(selectCartItems  
//const cartTotal = useSelector(selectCartTotal)
//checkoutitem
// import {useSelctor, useDispatch}
// import {selectCartItems}
// import {addItemToCart, clearItemFromCart, RemoveItemFromCart}
//const cartItems = useSelctor(selectartItems) 
//const dispatch = useDispacth()
//anywhere you see them above just wrap dispatch around it