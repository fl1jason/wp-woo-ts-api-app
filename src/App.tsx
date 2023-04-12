import './App.css';
import ProductList from './screens/ProductList';

import { CartProvider } from './context/CartContext';

const App = () => {
  
  return (
    <div className="App">
      <div className="App">
        <CartProvider>
        <ProductList />
        </CartProvider>
      </div>
    </div>
  );
}

export default App;
