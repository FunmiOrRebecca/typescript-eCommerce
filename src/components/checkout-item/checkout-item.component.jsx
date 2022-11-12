import './checkout-item.styles.jsx';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useSelector,  useDispatch} from 'react-redux';
import { selectCartItems } from '../../store/cartReducer/cart-selector';
import { addItemToCart,  clearItemFromCart, removeItemFromCart} from '../../store/cartReducer/cart-action';
import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, RemoveButton, Value, Quantity } from './checkout-item.styles.jsx';
const CheckoutItem = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem;
    // const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

    return(
        <CheckoutItemContainer>
                            <ImageContainer className='image-container'>
                                <img src={imageUrl} alt={`${name}`}/>
                            </ImageContainer>
                            <BaseSpan>{name}</BaseSpan>
                            <Quantity>
                                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                                {/*<span className='value'>{quantity}</span>*/}
                                <Value>{quantity}</Value>
                                <Arrow onClick={addItemHandler}> &#10095;</Arrow>
                            </Quantity>
                            <BaseSpan className='price'>{price}</BaseSpan>
                            <RemoveButton onClick={clearItemHandler}>
                                &#10005;
                            </RemoveButton>
                        </CheckoutItemContainer>
    )
}

export default CheckoutItem;