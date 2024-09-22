import "./checkout.styles.scss";
import { getCartItems, getCartTotal } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart/cart.context";
import { useDispatch } from "react-redux";
import { setCartCount, setCartTotal } from "../../store/cart/cart.actions";
import { CheckoutItem } from "../../components/checkoutItem/checkoutItem.component";
export const CheckOutPage = () => {
    // const {cartTotal,cartItems} = useContext(CartContext);
    const cartTotal = useSelector(getCartTotal);
    const cartItems = useSelector(getCartItems);
    const dispatch = useDispatch();
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>{
            return total + cartItem.quantity
        },0);
        const newTotal = cartItems.reduce((total,product) => total + (product.price * product.quantity),0);
        dispatch(setCartTotal( newTotal));
        dispatch(setCartCount(newCartCount));
    },[cartItems, dispatch]);
    
    return<>
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((product) => {
                        return <CheckoutItem key={product.id} cartItem = {product}/>
                })
            }
            <span className="total">Total : {cartTotal}</span>
        </div>
    </>
};