import "./checkoutItem.styles.scss";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart/cart.context";
import {removeCartItem, incrementCartItem, decrementCartItem } from "../../store/cart/cart.actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCartItems } from "../../store/cart/cart.selector";
export const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity}  = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(getCartItems);
    // const {removeCartItem, incrementCartItem, decrementCartItem} = useContext(CartContext);
    return <>
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={()=>dispatch(decrementCartItem(cartItem, cartItems))}>
                    &#10094;
                </div>
                {quantity}
                <div className="arrow" onClick = {() => dispatch(incrementCartItem(cartItem, cartItems))}>
                    &#10095;
                </div>
                
                </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={() => dispatch(removeCartItem(cartItem, cartItems))} >&#10005;</div>
        </div>
    </>
};