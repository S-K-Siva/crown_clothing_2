import {ReactComponent as ShoppingCart} from "../../assests/shopping-bag.svg";
import "./cartIcon.styles.scss";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart/cart.context";
// import { setCartOpen as setIsCartOpen } from "../../store/cart/cart.actions";
import { setIsCartOpen } from "../../store/cart/cart.reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCartOpen,getCartCount } from "../../store/cart/cart.selector";
export const CartIcon = () => {
    // const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext);
    const dispatch = useDispatch();
    const isCartOpen = useSelector(getCartOpen);
    const cartCount = useSelector(getCartCount);
    return <div className="cart-icon-container" onClick={() => dispatch(setIsCartOpen(!isCartOpen))}>
        <ShoppingCart className="shopping-icon" />
        <span className="item-count">{cartCount}</span>
    </div>;
};