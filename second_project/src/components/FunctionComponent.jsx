import "./FunctionComponent.css";
import axios from "axios";
import { usePosts } from "./ManagingPosts";
import { useState, useEffect } from "react";

export default function FunctionComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { posts, setPosts } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`
      );
      const totalItems = response.headers["x-total-count"];
      setPosts(response.data);
      setTotalPages(Math.ceil(totalItems / postsPerPage));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search posts..."
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
            <button
              onClick={() => deletePost(post.id)}
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
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
      <a
        href="/add-product"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        AddPost
      </a>
    </div>
  );
}
