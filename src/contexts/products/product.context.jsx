import { createContext } from "react";
import { useState } from "react";
import DATA from '../../shop-data.json';


export const ProductContext = createContext({
    products : [],
    setProducts : () => []
});


export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState(DATA);
    const currentValue = {products, setProducts};
    return <ProductContext.Provider value={currentValue}>
        {children}
    </ProductContext.Provider>
};