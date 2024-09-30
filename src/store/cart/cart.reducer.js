
import { ACTIONS } from "./cart.types";
import { createSlice } from "@reduxjs/toolkit";
const INITIAL_VALUE = {
    isCartOpen : false, 
    cartItems : [], 
    cartCount : 0,
    cartTotal : 0
};


const CartSlice = createSlice({
    name : 'cart',
    initialState : INITIAL_VALUE,
    reducers : {
        setIsCartOpen(state,action){
            state.isCartOpen = action.payload;
        },
        setCartItems(state,action){
            state.cartItems = action.payload;
        },
        setCartCount(state,action){
            state.cartCount = action.payload;
        },
        setCartTotal(state,action){
            state.cartTotal = action.payload;
        }
    }
});

export const {setIsCartOpen, setCartItems, setCartCount, setCartTotal} = CartSlice.actions;

export const CartReducer = CartSlice.reducer;


export const CartReducerOld = (state = INITIAL_VALUE, action) => {
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
            return state;
    };
}