import React from 'react';
import axios from 'axios';
import '../App.css';

import { Product, ProductSearchParams, CartContextType} from '../api/woocommerce.d';
import { wooGetProductsUrl } from '../api/wpAPI';

import CartList from './CartList';

import { CartContext } from '../context/CartContext';

const ProductList = () => {

  const { cartItems, onAddToCart, onRemoveFromCart, onClearCart } = React.useContext(CartContext) as CartContextType;

  const [pages, setPages] = React.useState<Product[]>([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const someFunc = () => {
    console.log("Do some stuff!");
  }

  const fetchPosts = async () =>{

    try {
      let params: ProductSearchParams = { search :'Lakeside' };

      const response = await axios.get<Product[]>(wooGetProductsUrl(params));
      setPages(response.data);
      setLoading(false);

    } catch (error) {
      setError(error.message);
    }
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="Grid">
      <div className="ProductList">
        <ul className="posts">
        { loading ? 
        'Loading please wait...' :
        pages.map((page) => (
          <li key={page.id}>
            <p>{page.name}</p>
            <button onClick={()=>onAddToCart(page)}>Add To Cart</button>
            <button onClick={()=>onRemoveFromCart(page)}>Remove From Cart</button>
          </li>
        ))}
        </ul>
        {error && <p className="error">{error}</p>}
        <button onClick={()=>onClearCart()}>ClearCart</button>
      </div>
      <div className="Cart">
        <CartList />
      </div>
    </div>
  );
}

export default ProductList;
