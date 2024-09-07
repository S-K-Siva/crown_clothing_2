import "./shop.styles.scss";
import { useContext } from "react";
import { ProductContext } from "../../contexts/products/product.context";
import { ProductCard } from "../../components/product-card/product-card.component";
export const Shop = () => {
    const {products} = useContext(ProductContext);
    console.log(products);
    return <div className="products-container">
        {
            products.map((product) => <ProductCard key={product.id} product={product}/>)
        }
    </div>
};