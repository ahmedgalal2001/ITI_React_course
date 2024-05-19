import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
const PostsContext = createContext();
export const PostsProvider = function ({ children }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
