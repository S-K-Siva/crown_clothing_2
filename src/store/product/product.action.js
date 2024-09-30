import { TYPES } from "./product.types"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
export const setProducts = (data) => ({type : TYPES.SET_PRODUCTS, payload : data});

export const setProductsStart = () => ({type : TYPES.SET_PRODUCTS_START});

export const setProductsSuccess = (data) => ({type : TYPES.SET_PRODUCTS_SUCCESS,payload : data});

export const setProductsFailure = (error) => ({type : TYPES.SET_PRODUCTS_FAILURE, payload : error});

// initialize async behaviour for thunk


export const setProductsAsync = () => async (dispatch) => {
    dispatch(setProductsStart()); // it will return default state, since we didn't add spinner specific to products

    try{
        const data = await getCategoriesAndDocuments();
        dispatch(setProductsSuccess(data));
    }catch(err){
        dispatch(setProductsFailure(err));
    }
}