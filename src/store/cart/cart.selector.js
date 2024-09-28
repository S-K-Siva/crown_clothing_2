import { createSelector } from "reselect";

// export const getCartTotal = (state) => state.cart.cartTotal;

export const getCartItems = (state) => state.cart.cartItems;

export const getCartOpen = (state) => state.cart.isCartOpen;

// export const getCartCount = (state) => state.cart.cartCount;

// converting it to memoized selector using 'reselect' library
export const getCartCount = createSelector([getCartItems],(items) => items.reduce((acc,item) => acc+(item.quantity),0));

export const getCartTotal = createSelector([getCartItems],(items) => items.reduce((acc,item)=>acc+(item.quantity*item.price),0));