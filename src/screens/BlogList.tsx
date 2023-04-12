import React from 'react';
import axios from 'axios';
import '../App.css';

import { Post, PostSearchParams } from '../api/wordpress.d';
import { wpGetPostsUrl } from '../api/wpAPI';

const BlogList = () => {

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const fetchPosts = async () =>{

    try {
      let params: PostSearchParams = { search :'fl1' };

      const response = await axios.get<Post[]>(wpGetPostsUrl(params));
      setPosts(response.data);
      setLoading(false);

      console.log(posts);
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
        
        posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title.rendered}</h3>
            <p>{post.excerpt.rendered}</p>
          </li>
        ))}
        </ul>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default BlogList;
