import './product-card.styles.scss';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart/cart.context';
export const ProductCard = ({product}) => {
    const {addToCart} = useContext(CartContext);
    const {id,name,imageUrl,price} = product;

    return <div className="product-card-container" key={id}>
        <img src={imageUrl} alt={name}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType='inverted' onClick={() => addToCart(product)} >Add to card</Button>
    </div>
};