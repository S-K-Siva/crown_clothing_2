import { ACTIONS } from "./cart.types";

import { setCartItems } from "./cart.reducer";
export const setCartOpen = (value) => ({type : ACTIONS.SET_CART_IS_OPEN, payload : value});
export const addItemToCart = (product,cartItems) => {
    
    const productExist = cartItems.find((element) => element.id === product.id);

    if(productExist){
        const newItems = cartItems.map((item) => item.id === product.id ? {...item, quantity : item.quantity + 1} : item);
        return newItems;
    }

    return [...cartItems,{...product, quantity : 1}];
};


export const increment = (item, cartItems) => {
    return cartItems.map((product) => product.id === item.id ? {...product, quantity:product.quantity + 1} : product);
}

export const decrement = (item, cartItems) => {
    if(item.quantity === 1){
        return cartItems.filter((product) => product.id !== item.id);
    }

    return cartItems.map((product)=> product.id === item.id ? {...product, quantity : product.quantity - 1} : product);
}

export const removeItem = (item , cartItems) => {
    return cartItems.filter((product) => product.id !== item.id);
}

export const incrementCartItem = (item, cartItems) => setCartItems(increment(item, cartItems));
export const decrementCartItem = (item, cartItems) => setCartItems(decrement(item, cartItems));
export const removeCartItem = (item,cartItems) => setCartItems(removeItem(item, cartItems));

export const setIsCartOpen = (value) => ({type : 'SET_CART_IS_OPEN',payload : value});
export const setCartTotal = (cartTotal) => ({type : 'SET_CART_TOTAL',payload : cartTotal});
export const setCartCount = (cartCount) => ({type : 'SET_CART_COUNT',payload : cartCount});
// export const setCartItems = (items) => ({type : ACTIONS.SET_CART_ITEMS, payload : items}); // for redux library
