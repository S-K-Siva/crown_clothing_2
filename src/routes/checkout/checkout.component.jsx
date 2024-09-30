import "./checkout.styles.scss";
import { getCartItems, getCartTotal } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartCount, setCartTotal } from "../../store/cart/cart.actions";
import { CheckoutItem } from "../../components/checkoutItem/checkoutItem.component";
import { ReactComponent as RazorpayIcon } from "../../assests/razorpay.svg"; // Ensure correct path to the SVG

export const CheckOutPage = () => {
    const cartTotal = useSelector(getCartTotal);
    const cartItems = useSelector(getCartItems);
    const dispatch = useDispatch();

    const handleRazorPayment = (response) => {
        const { razorpay_payment_id } = response;
        console.log("Payment done with the ID: ", razorpay_payment_id);
    };

    const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY ,
        key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
        currency: "INR",
        amount: cartTotal * 100,
        prefill: {
            name: "Siva S K",
            email: "siva@example.com",
            contact: "8000006868",
        },
        notes: {
            address: "TamilNadu, India",
        },
        handler: handleRazorPayment,
        name: "Siva S K",
        description: "Testing of Clothing Application",
    };

    const paymentHandler = (event) => {
        event.preventDefault();
        console.log("Payment handler clicked");
        const pay = new window.Razorpay(options);
        pay.open();
    };

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);
        const newTotal = cartItems.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
        dispatch(setCartTotal(newTotal));
        dispatch(setCartCount(newCartCount));
    }, [cartItems, dispatch]);

    return (
        <>
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
                {cartItems.map((product) => {
                    return <CheckoutItem key={product.id} cartItem={product} />;
                })}
                <span className="total">Total: {cartTotal}</span>
              
                <div className="container payment-gateway d-flex justify-content-center align-items-center mt-5">
                    <button type="button" onClick={paymentHandler} className="btn btn-info">
                        Pay with RazorPay
                    </button>
                </div>
            </div>
        </>
    );
};
