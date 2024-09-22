import { createContext, useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
// import SHOP_DATA from '../../shop-data.js';
import {getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";

export const ProductContext = createContext({
    products : [],
    setProducts : () => []
});

const INITIAL_VALUE = {
    products : []
};

const ACTIONS = {
    SET_PRODUCTS : 'SET_PRODUCTS'
}
const ProductReducer = (state, action) =>{
    const {type, payload} = action;


    switch(type){
        case ACTIONS.SET_PRODUCTS:
            return {
                products : payload
            }
        default:
            throw new Error(`unhandled type ${type}`);
    };

}


export const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(ProductReducer, INITIAL_VALUE);
    // const [products, setProducts] = useState({});
    const {products} = state;
    const setProducts = function(products) 
    {
        dispatch({type : 'SET_PRODUCTS', payload : products})
    }

    useEffect(()=>{
        const getData = async() => {
            const data = await getCategoriesAndDocuments();
            setProducts(data);
        };
        getData();
    },[]);
    const currentValue = {products, setProducts};
    
    return <ProductContext.Provider value={currentValue}>
        {children}
    </ProductContext.Provider>
};