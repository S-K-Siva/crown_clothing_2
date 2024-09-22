import "./category.styles.scss";
// import { useContext } from "react";
import { useParams } from "react-router-dom";
// import { ProductContext } from "../../contexts/products/product.context";
import { ProductCard } from "../product-card/product-card.component";
import { getProducts } from "../../store/product/product.selector";
import { useSelector } from "react-redux";
export const Category = () => {
    // const {products} = useContext(ProductContext);
    const products = useSelector(getProducts);
    let {category} = useParams();
    category = category.slice(0,1).toUpperCase() + category.slice(1); 
    const data = products[category];
    return <>
        <div className="shop-container">
            <center>
                <h2>
                    <span className="title">{category.toUpperCase()}</span>
                </h2>
            </center>
            <div className="preview">
                {
                    data  && data.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    </>
}