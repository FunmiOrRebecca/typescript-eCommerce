import { createContext, useState, useEffect, useReducer} from "react";

const addCartItem = (cartItems, productToAdd) => {
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
const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItemToRemove.id === cartItem.id);

    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);

    }


    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem )
}
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemsToCart: () => {}, 
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: ()=> {},
    cartTotal: 0
});


const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
    SET_CART_ITEMS: "SET_CART_ITEMS"
    //You dont need these because once the cart item changes
    //cart count and cart total must change too but payload will 
    //be isCartOpen, cartItems, cartCOunt, cartTotal
    // SET_CART_COUNT: "SET_CART_COUNT",
    // SET_CART_TOTAL: "SET_CART_TOTAL"
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {...state, isCartOpen: payload}
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {...state, ...payload}
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);

        
    }
}




const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal:0
}

export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);


    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const{cartItems, cartCount, cartTotal, isCartOpen} = state;
    
    const updateCartItemsReducer = (newCartItems) =>{
        const newCartCount = newCartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => (total + cartItem.quantity * cartItem.price), 0);
        console.log("Update items reducer", newCartCount, newCartTotal)
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}});
        //dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal:newCartTotal, cartCount: newCartCount} ));
        console.log("after Update items reducer", newCartCount, newCartTotal)

    }
    
    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems])

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0 )
    //     setCartCount(newCartCount)
    // }, [cartItems]);
    
    const addItemToCart = (productToAdd) => {
        console.log("cartItems to add", cartItems, productToAdd, cartCount, cartTotal);
        const newCartItems = addCartItem(cartItems, productToAdd);
        console.log("after cartItems to add", cartItems, productToAdd, cartCount, cartTotal);
        updateCartItemsReducer(newCartItems);
     
    
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);

    }
    const clearItemFromCart= (cartItemToClear) => {
       const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }
    const setIsCartOpen = (bool) => {
       // dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool});
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool})
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal}

     return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

