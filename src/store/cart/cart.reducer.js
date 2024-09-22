import { ACTIONS } from "./cart.types";
const INITIAL_VALUE = {
    isCartOpen : false, 
    cartItems : [], 
    cartCount : 0,
    cartTotal : 0
};



export const CartReducer = (state = INITIAL_VALUE, action) => {
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