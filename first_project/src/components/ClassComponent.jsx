import React, { Component } from "react";
import "./ClassComponent.css";
import axios from "axios";
class ClassComponent extends Component {
  state = {
    data: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 10,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { currentPage, itemsPerPage } = this.state;
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${itemsPerPage}`
      );
      const totalItems = response.headers["x-total-count"];
      this.setState({
        data: response.data,
        loading: false,
        totalPages: Math.ceil(totalItems / itemsPerPage),
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleNextPage = () => {
    this.setState(
      (prevState) => ({
        currentPage: Math.min(prevState.currentPage + 1, prevState.totalPages),
      }),
      this.fetchData
    );
  };

  handlePreviousPage = () => {
    this.setState(
      (prevState) => ({
        currentPage: Math.max(prevState.currentPage - 1, 1),
      }),
      this.fetchData
    );
  };

  render() {
    const { data, loading, error, currentPage, totalPages } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>Data:</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Body
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {post.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.body}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-blue-300"
            onClick={this.handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-blue-300"
            onClick={this.handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  }
}

export default ClassComponent;
