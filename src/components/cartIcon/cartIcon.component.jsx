import {ReactComponent as ShoppingCart} from "../../assests/shopping-bag.svg";
import "./cartIcon.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart/cart.context";
export const CartIcon = () => {
    const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext);
    return <div className="cart-icon-container" onClick={() => setIsCartOpen(!isCartOpen)}>
        <ShoppingCart className="shopping-icon" />
        <span className="item-count">{cartCount}</span>
    </div>;
};