import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cartReducer/cart-selector';
import { addItemToCart } from '../../store/cartReducer/cart-action';
import { ProductCardcontainer, Footer, Name, Price } from './product-card.styles';
const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    // const { addItemToCart} = useContext(CartContext);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
    return(
            <ProductCardcontainer key={product.id}>
                    <img src={product.imageUrl} alt={`${product.name}`}/>
                    <Footer className='footer'>
                        <Name className='name'>{product.name} </Name>  
                        <Price className='price'> {product.price}</Price>                  
                    </Footer>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
            </ProductCardcontainer>
    )
} 

export default ProductCard;