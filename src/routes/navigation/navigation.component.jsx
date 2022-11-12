import './navigation.component.styles.jsx';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {Outlet, Link} from "react-router-dom";
import { Fragment, useContext} from 'react';
//import { UserContext } from '../../contexts/user.context';
// import { signOutUser } from '../../utils/firebase';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
// import { CartContext } from '../../contexts/cart.context'; 
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/userReducer/user-selector"
import { selectIsCartOpen } from '../../store/cartReducer/cart-selector';
import { signOutStart } from '../../store/userReducer/user-action';
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from './navigation.component.styles.jsx';

const Navigation = () => {
    //const{ currentUser, setCurrentUser} = useContext(UserContext);
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();

    const signOutUser = () => dispatch(signOutStart());
    // const signOutHandler = async () => {
    //     const res = signOutUSer();
    //     setCurrentUser(null);
    // }
    return(
       <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <Logo className='logo'/>
            </LogoContainer>
           <NavLinks>
               <NavLink to="/shop">SHOP</NavLink>
               {currentUser? 
                (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : 
                (<NavLink className='nav-link' to="/auth">SIGN IN</NavLink>)
            }
            <CartIcon/>
           </NavLinks>
           {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet />
       </Fragment>
    )

}


export default Navigation;


// {/*(<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>) : */}