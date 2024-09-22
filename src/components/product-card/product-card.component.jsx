import './product-card.styles.scss';
import Button from '../button/button.component';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart/cart.context';
import { addItemToCart as addToCart} from '../../store/cart/cart.actions';
import { setCartItems } from '../../store/cart/cart.actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCartItems } from '../../store/cart/cart.selector';
export const ProductCard = ({product}) => {
    // const {addToCart} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(getCartItems);
    const {id,name,imageUrl,price} = product;

    return <div className="product-card-container" key={id}>
        <img src={imageUrl} alt={name}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType='inverted' onClick={() => dispatch(setCartItems(addToCart(product, cartItems)))} >Add to card</Button>
    </div>
};