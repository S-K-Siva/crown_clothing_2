import { createContext } from "react";
import { useState, useEffect } from "react";
import { useReducer } from "react";
export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : () => {},
    cartItems : [],
    setCartItems : () => {},
    cartCount : 0,
    cartTotal : 0,
    setCartTotal : () => {}
});

const INITIAL_VALUE = {
    isCartOpen : false, 
    cartItems : [], 
    cartCount : 0,
    cartTotal : 0
};

const addItemToCart = (product,cartItems) => {
    
    const productExist = cartItems.find((element) => element.id === product.id);

    if(productExist){
        const newItems = cartItems.map((item) => item.id === product.id ? {...item, quantity : item.quantity + 1} : item);
        return newItems;
    }

    return [...cartItems,{...product, quantity : 1}];
};


const increment = (item, cartItems) => {
    return cartItems.map((product) => product.id === item.id ? {...product, quantity:product.quantity + 1} : product);
}

const decrement = (item, cartItems) => {
    if(item.quantity === 1){
        return cartItems.filter((product) => product.id !== item.id);
    }

    return cartItems.map((product)=> product.id === item.id ? {...product, quantity : product.quantity - 1} : product);
}

const removeItem = (item , cartItems) => {
    return cartItems.filter((product) => product.id !== item.id);
}

const ACTIONS = {
    SET_CART_IS_OPEN : 'SET_CART_IS_OPEN',
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    SET_CART_COUNT : 'SET_CART_COUNT',
    SET_CART_TOTAL : 'SET_CART_TOTAL'
};
const CartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case ACTIONS.SET_CART_COUNT:
            return {
                ...state,
                cartCount : payload 
            };
        case ACTIONS.SET_CART_IS_OPEN:
            return {
                ...state,
                isCartOpen : payload
            };
        case ACTIONS.SET_CART_ITEMS:
            return {
                ...state,
                cartItems : payload
            };
        case ACTIONS.SET_CART_TOTAL:
            return {
                ...state, 
                cartTotal : payload
            }
        default:
            throw new Error(`unhandled type ${type}`);
    };
}
export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [state, dispatch] = useReducer(CartReducer, INITIAL_VALUE);
    const {isCartOpen, cartItems,cartTotal,cartCount} = state;
    const setIsCartOpen = (value) => dispatch({type : 'SET_CART_IS_OPEN',payload : value});
    const setCartItems = (cartItems) => dispatch({type : 'SET_CART_ITEMS',payload : cartItems});
    const setCartTotal = (cartTotal) => dispatch({type : 'SET_CART_TOTAL',payload : cartTotal});
    const setCartCount = (cartCount) => dispatch({type : 'SET_CART_COUNT',payload : cartCount});
    const addToCart = (product) => {
        setCartItems(addItemToCart(product,cartItems));
    }
    
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>{
            return total + cartItem.quantity
        },0);
        const newTotal = cartItems.reduce((total,product) => total + (product.price * product.quantity),0);
        setCartTotal( newTotal);
        setCartCount(newCartCount);
    },[cartItems]);

    const incrementCartItem = (item) => setCartItems(increment(item, cartItems));
    const decrementCartItem = (item) => setCartItems(decrement(item, cartItems));
    const removeCartItem = (item) => setCartItems(removeItem(item, cartItems));
    const vals = {cartTotal, setCartTotal, isCartOpen, setIsCartOpen, removeCartItem,incrementCartItem, decrementCartItem, cartItems, setCartItems, addToCart,cartCount, setCartCount};
    return <CartContext.Provider value = {vals}>
        {children}
    </CartContext.Provider>
}