import { TYPES } from "./product.types";
const INITIAL_VALUE = {
    products : []
};

export const ProductReducer = (state = INITIAL_VALUE, action) =>{
    const {type, payload} = action;

    switch(type){
        case TYPES.SET_PRODUCTS:
            return {
                products : payload
            }
        default:
            return state;
    };

}