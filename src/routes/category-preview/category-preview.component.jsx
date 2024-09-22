import "./category-preview.styles.scss";
// import { useContext } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../store/product/product.selector";
// import { ProductContext } from "../../contexts/products/product.context";
import { CategoryPreviewComponent } from "../../components/category-preview/category-preview.component";
export const CategoryPreview = () => {
    // const {products} = useContext(ProductContext);
    const products = useSelector(getProducts);
    return (<>
        {
            Object.entries(products).map((item)=> {
            const title = item[0];
            const items = item[1];
            return (
                <CategoryPreviewComponent title={title} products = {items}/>
            )
        })
        }
    </>);
    
}
        
