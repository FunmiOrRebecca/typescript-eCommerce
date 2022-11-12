import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useSelector } from 'react-redux';
import { selectIsCartOpen, selectCartCount } from '../../store/cartReducer/cart-selector';
import { setIsCartOpen } from '../../store/cartReducer/cart-action';
import { useDispatch } from 'react-redux';
import { CartIconContainer, ItemCount } from './cart-icon.styles.jsx';
const CartIcon = () => {
    // const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => {
        console.log(isCartOpen);
        dispatch(setIsCartOpen(!isCartOpen));
        console.log(isCartOpen);
    }
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
           <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;