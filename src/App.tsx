import './App.css';
import BlogList from './screens/BlogList';

import { CartProvider } from './context/CartContext';

const App = () => {

  return (
    <div className="App">
      <div className="App">
        <CartProvider>
          <BlogList />
        </CartProvider>
      </div>
    </div>
  );
}

export default App;
