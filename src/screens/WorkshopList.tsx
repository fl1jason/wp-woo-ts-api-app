import React from 'react';
import axios from 'axios';
import '../App.css';

import { Event, EventSearchParams } from '../api/wordpress.d';
import { wpGetEventsUrl } from '../api/wpAPI';

const WorkshopList = () => {

  const [categories, setCategories] = React.useState<Event[]>([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const fetchPosts = async () =>{

    try {
      let params: EventSearchParams = { search :'fl1' };

      const response = await axios.get<Event[]>(wpGetEventsUrl(params));
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
            <h3>{category.title.rendered}</h3>
            <p>{`${category.date}`}</p>
          </li>
        ))}
        </ul>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default WorkshopList;
