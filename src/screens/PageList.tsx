import React from 'react';
import axios from 'axios';
import '../App.css';

import { Page, PageSearchParams } from '../api/wordpress.d';
import { wpGetPagesUrl } from '../api/wpAPI';

const PageList = () => {

  const [pages, setPages] = React.useState<Page[]>([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const someFunc = () => {
    console.log("Do some stuff!");
  }

  const fetchPosts = async () =>{

    try {
      let params: PageSearchParams = { search :'fl1' };

      const response = await axios.get<Page[]>(wpGetPagesUrl(params));
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
    <div className="App">
      <div className="App">
        <ul className="posts">
        { loading ? 
        'Loading please wait...' :
        pages.map((page) => (
          <li key={page.id}>
            <h3>{page.title.rendered}</h3>
            <p>{page.excerpt.rendered}</p>
          </li>
        ))}
        </ul>
        {error && <p className="error">{error}</p>}

        <button onClick={someFunc}>Do some Stuff</button>
      </div>
    </div>
  );
}

export default PageList;
