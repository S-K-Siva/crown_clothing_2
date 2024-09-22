import { Route, Routes } from "react-router-dom";
import { CategoryPreview } from "../category-preview/category-preview.component.jsx"
import { Category } from "../../components/category/category.component.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";
import { setProducts } from "../../store/product/product.action.js";
export const Shop = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const getData = async() => {
            const data = await getCategoriesAndDocuments();
            dispatch(setProducts(data));
        };
        getData();
    },[dispatch]);
    
    return <Routes>
        <Route index element={<CategoryPreview />}/>
        <Route path=":category" element={<Category />}/>
    </Routes>
}