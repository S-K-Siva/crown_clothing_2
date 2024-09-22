import "./navigation.styles.scss";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrownLogo } from "../../assests/crown.svg";
// import { UserContext } from "../../contexts/user/user.context";
// import { useContext } from "react";
import {signOutUser} from "../../utils/firebase/firebase.utils.js";
import { CartIcon } from "../cartIcon/cartIcon.component.jsx";
import { CartDropDown } from "../cart-dropdown/cart-dropdown.component.jsx";
// import { CartContext } from "../../contexts/cart/cart.context.jsx";
import { getCartOpen } from "../../store/cart/cart.selector.js";
import { getCurrentUser } from "../../store/user/user.selector.js";
import { useSelector } from "react-redux";
const NavigationComponent = () => {
    const currentUser = useSelector(getCurrentUser);
    // const {currentUser } = useContext(UserContext);
    // const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    const isCartOpen = useSelector(getCartOpen);
   
    return <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrownLogo />
            </Link>
            
        <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            {
                currentUser=== null ?
                <Link className="nav-link" to="/auth">
                    SIGN IN
                </Link> :
                <span className="nav-link" to="/auth" onClick={()=> signOutUser()}>
                    SIGN OUT
                </span>
            }
            <CartIcon/>
        </div>
            {isCartOpen ? <CartDropDown /> : ""}
        </div>
        <Outlet/>
    </Fragment>;
}

export default NavigationComponent;