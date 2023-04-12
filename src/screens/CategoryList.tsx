import React from 'react';
import axios from 'axios';
import '../App.css';

import { Category, CategorySearchParams } from '../api/wordpress.d';
import { wpGetCategoriesUrl } from '../api/wpAPI';

const CategoryList = () => {

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const fetchPosts = async () =>{

    try {
      let params: CategorySearchParams = { search :'fl1' };

      const response = await axios.get<Category[]>(wpGetCategoriesUrl(params));
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
            <p>{`There are ${category.count} articles in ${category.name}`}</p>
          </li>
        ))}
        </ul>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default CategoryList;
