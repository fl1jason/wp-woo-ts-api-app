import React from 'react';
import axios from 'axios';
import '../App.css';

export interface Content {
  rendered:  string;
  protected: boolean;
}

export interface Post {
	id: number;
	title: Content;
	content: Content;
	excerpt: Content;
	modified: string;
	date: string;
}

const BlogList = () => {

  const [posts, setPosts] = React.useState<Post>();
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const fetchPosts = async () =>{

    try {
      const response = await axios.get<Post>(`https://fl1digital.com/wp-json/wp/v2/posts/3997`);
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
        
        </ul>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default BlogList;
