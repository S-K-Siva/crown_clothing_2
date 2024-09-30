import { TYPES } from "./product.types";
import { createSlice } from "@reduxjs/toolkit";
const INITIAL_VALUE = {
    products: [],
    error: null,
};
export const ProductSlice = createSlice(
    {
        name : 'products',
        initialState : INITIAL_VALUE,
        reducers : {
            setProducts(state,action){
                state.products = action.payload;
            }
        }
    }
)
export const {setProducts} = ProductSlice.actions;

export const ProductReducer = ProductSlice.reducer;

export const ProductReducerOld = (state = INITIAL_VALUE, action) => {
    const { type, payload } = action;

    switch (type) {
        case TYPES.SET_PRODUCTS_START:
            // No state modification needed for the start action (could handle loading state here)
            return {
                ...state, 
                error: null // Reset any previous error
            };
            
        case TYPES.SET_PRODUCTS_SUCCESS:
            return {
                ...state,     // Spread the existing state first
                products: payload,  // Update only the products
            };

        case TYPES.SET_PRODUCTS_FAILURE:
            return {
                ...state,     // Spread the existing state
                error: payload,   // Set the error received from the action
            };

        default:
            return state;
    }
};
