import { createContext } from "react";
import { useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : () => {},
    cartItems : [],
    setCartItems : () => {},
    cartCount : 0
});

const addItemToCart = (product,cartItems) => {
    
    const productExist = cartItems.find((element) => element.id === product.id);

    if(productExist){
        const newItems = cartItems.map((item) => item.id === product.id ? {...item, quantity : item.quantity + 1} : item);
        return newItems;
    }

    return [...cartItems,{...product, quantity : 1}];
}

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const addToCart = (product) => {
        setCartItems(addItemToCart(product,cartItems));
    }
    
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>{
            return total + cartItem.quantity
        },0);

        setCartCount(newCartCount);
    },[cartItems]);
    const vals = {isCartOpen, setIsCartOpen, cartItems, setCartItems, addToCart,cartCount, setCartCount};
    return <CartContext.Provider value = {vals}>
        {children}
    </CartContext.Provider>
}