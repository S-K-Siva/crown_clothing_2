import { combineReducers } from "redux";
import { UserReducer } from "./user/user.reducer.js";
import { ProductReducer } from "./product/product.reducer.js";
import { CartReducer } from "./cart/cart.reducer.js";
export const rootReducer = combineReducers({
    user : UserReducer,
    product : ProductReducer,
    cart : CartReducer
});