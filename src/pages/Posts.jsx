import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserItems } from "../utils/utils";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const titles = await getUserItems(POSTS_URL, userId);
      setPosts(titles);
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <h4>Posts:</h4>
      <ul>
        {posts.map((title, index) => {
          return <li key={index}>{title}</li>;
        })}
      </ul>
    </>
  );
};

export default Posts;
