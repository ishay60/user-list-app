import { useState, useEffect } from "react";
import { getUserItems } from "../utils/utils";
import { addPostToServer } from "../utils/utils";
import NewPost from "./NewPost";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { titles } = await getUserItems(POSTS_URL, userId);
      setPosts(titles);
    };
    fetchData();
  }, [userId]);

  const addPost = async (newPost) => {
    const response = await addPostToServer(newPost);
    if (response.status === 200) {
      const postWithId = { ...newPost, id: posts.length + 1, userId };
      setPosts([...posts, postWithId]);
    }
  };

  return (
    <>
      <h4>Posts:</h4>
      <ul>
        {posts.map((title, index) => {
          return <li key={index}>{title}</li>;
        })}
      </ul>
      <NewPost addPost={addPost} />
    </>
  );
};

export default Posts;
