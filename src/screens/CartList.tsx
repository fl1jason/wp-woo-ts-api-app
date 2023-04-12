import React from 'react';
import '../App.css';

import { CartContextType} from '../api/woocommerce.d';
import { CartContext } from '../context/CartContext';

const CartList = () => {

  const { cartItems, onAddToCart, onRemoveFromCart, onClearCart, onDeductOne } = React.useContext(CartContext) as CartContextType;

  React.useEffect(() => {
  
  }, []);

  return (

      <div className="ShoppingCart">
        <ul className="posts">
        {cartItems.map((item) => (
          <li key={item.product.id}>
            <h3>{item.product.name}</h3>
            <p>{item.quantity}</p>
            <button onClick={()=>onAddToCart(item.product)}>+1</button>
            <button onClick={()=>onDeductOne(item.product)}>-1</button>
            <button onClick={()=>onRemoveFromCart(item.product)}>Remove Item from Cart</button>
          </li>
        ))}
        </ul>
        <button onClick={()=>onClearCart()}>ClearCart</button>
        {cartItems.length > 0 && <p className="error">{cartItems.length} {cartItems.length>1?'items':'item'} in your cart</p>}
      </div>
  );
}

export default CartList;
