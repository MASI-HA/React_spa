import React, { useState, useEffect } from "react";
import { FaBookOpen, FaPlus, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const IndexPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.slice(0, 9));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-info fw-bold">Posts :</h2>
        <Link to="/posts/creat" className="btn btn-info fw-bold">
          <FaPlus className="me-2" />
          Create New Post
        </Link>
      </div>

      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 border-info shadow-lg app-card-glass">

              <div className="card-header border-info fw-bold text-info d-flex justify-content-between align-items-center py-3 bg-transparent">
                <span className="h5 mb-0">
                  <FaBookOpen className="me-2" />
                  {post.title.substring(0, 30)}...
                </span>
              </div>

              <div className="card-body text-light">
                <p className="card-text">{post.body.substring(0, 100)}...</p>

                <Link
                  to={`/posts/${post.id}`}
                  className="btn btn-sm btn-outline-info fw-bold w-100 mt-3"
                >
                  <FaEye className="me-2" />
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPosts;
