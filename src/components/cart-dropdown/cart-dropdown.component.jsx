import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartItem } from "../cartItem/cartItem.component";
import { CartContext } from "../../contexts/cart/cart.context";
export const CartDropDown = () => {
    const {cartItems} = useContext(CartContext);
    return <>
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems && cartItems.map((product) => <CartItem cartItem = {product}/>)}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    </>;
};