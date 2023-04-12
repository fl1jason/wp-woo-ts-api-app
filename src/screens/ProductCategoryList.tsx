import React from 'react';
import axios from 'axios';
import '../App.css';

import { Category, ProductCategoriesSearchParams } from '../api/woocommerce.d';
import { wooGetProductCategoriesUrl } from '../api/wpAPI';

const ProductCategoryList = () => {

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const fetchPosts = async () =>{

    try {
      let params: ProductCategoriesSearchParams = { search :'' };

      const response = await axios.get<Category[]>(wooGetProductCategoriesUrl(params));
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <div className="App">
        <ul className="posts">
        { loading ? 
        'Loading please wait...' :
        categories.map((category) => (
          <li key={category.id}>
            <h3>{category.id}</h3>
            <p>{`There are ${category.count} products in ${category.name}`}</p>
          </li>
        ))}
        </ul>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default ProductCategoryList;
