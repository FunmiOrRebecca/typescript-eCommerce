import './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart.item.component';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cartReducer/cart-selector';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    // const {cartItems} = useContext(CartContext)
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }
    return(
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length? (cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                   
                ))) : <EmptyMessage>Your Cart is Empty</EmptyMessage>}
       
                <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
            </CartItems>
        </CartDropdownContainer>
    )
}


export default CartDropdown;