import "./AddProduct.css";
import axios from "axios";
import { useState } from "react";
import {usePosts} from "../components/ManagingPosts";
const AddProduct = () => {
  const {posts, setPosts} = usePosts();
  const [product, setProduct] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProduct({ title: "", body: "" }); // Reset form
    axios
      .post("https://jsonplaceholder.typicode.com/posts", product)
      .then((response) => {
        setPosts([...posts, response.data]);
        console.log(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700"
        >
          Body
        </label>
        <textarea
          id="body"
          name="body"
          value={product.body}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
