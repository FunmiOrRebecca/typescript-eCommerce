import './cart.item.styles.jsx';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import { CartItemContainer, ItemDetails } from './cart.item.styles.jsx';

const CartItem = ({cartItem}) => { 
    const {name, imageUrl, price, quantity} = cartItem;
       return(
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <ItemDetails>
                <span>{name}</span>
                <span>{quantity} x ${price}</span>

            </ItemDetails>
</CartItemContainer>
    )
}

export default CartItem;

