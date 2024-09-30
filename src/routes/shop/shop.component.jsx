import { Route, Routes } from "react-router-dom";
import { CategoryPreview } from "../category-preview/category-preview.component.jsx"
import { Category } from "../../components/category/category.component.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";
// import { setProducts } from "../../store/product/product.action.js"; // redux library
import { setProducts } from "../../store/product/product.reducer.js"; // redux-toolkit
import { getCartItems } from "../../store/cart/cart.selector.js";
import { setCartCount } from "../../store/cart/cart.actions.js";
import { setProductsAsync } from "../../store/product/product.action.js";
import { setProductsStart } from "../../store/product/product.action.js";
export const Shop = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const getData = async() => {
            const data = await getCategoriesAndDocuments();
            dispatch(setProducts(data));
        };
        getData();

        
    },[dispatch]);

    // Handling async functions using redux-thunk(dispatching the async functions)
    // dispatch(setProductsAsync()); 

    // redux-saga
    // dispatch(setProductsStart());
    
    

    const cartItems = useSelector(getCartItems);
    
    
   
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem)=>{
            return total + cartItem.quantity
        },0);

        dispatch(setCartCount(newCartCount));

    },[cartItems]);

    return <Routes>
        <Route index element={<CategoryPreview />}/>
        <Route path=":category" element={<Category />}/>
    </Routes>
}