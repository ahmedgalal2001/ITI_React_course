import "./FunctionComponent.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost } from "../Products/productsOperations";
import { useState, useEffect } from "react";

export default function FunctionComponent() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  let content;

  if (postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    content = posts.map((post) => (
      <div key={post.id}>
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
        <div key={post.id} className="bg-white shadow-md rounded-md p-4">
          <p className="text-gray-600">{post.body}</p>
          <button
            onClick={() => handleDelete(post.id)}
            className="text-red-500 mt-4 hover:text-red-600 "
          >
            Delete
          </button>
          <a href={"/details/" + post.id} className="text-blue-500">
            See Details
          </a>
          <a href={"/edit-product/" + post.id} className="text-blue-500">
            Edit
          </a>
        </div>
      </div>
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      {content}
      <a href="/add-product" className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Add</a>
    </div>
  );
}
