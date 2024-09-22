import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
// import { useContext } from "react";
import { CartItem } from "../cartItem/cartItem.component";
// import { CartContext } from "../../contexts/cart/cart.context";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCartItems } from "../../store/cart/cart.selector";
export const CartDropDown = () => {
    // const {cartItems} = useContext(CartContext);
    const cartItems = useSelector(getCartItems);
    const nav = useNavigate();
    return <>
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems && cartItems.map((product) => <CartItem cartItem = {product}/>)}
            </div>
            <Button onClick={()=>{nav("/checkout")}}>GO TO CHECKOUT</Button>
        </div>
    </>;
};