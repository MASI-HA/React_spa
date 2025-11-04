import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ListPosts from "../../Components/Post/ListPosts";

const IndexPosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        const limitedPosts = data.slice(0, 9);
        setPosts(limitedPosts);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row g-3">
        <div className="d-flex justify-content-between align-items-center w-100 mb-4 px-3">
          <h2 className="text-info fw-bold mb-0">Posts :</h2>

          <Link to="/posts/creat" className="btn btn-create-glass">
            <FaPlus className="me-2" />
            Create New Post
          </Link>
        </div>

        {error && (
          <div className="card-glass alert-glass-danger p-3">
            <p className="text-danger mb-0">{error}</p>
          </div>
        )}
        {loading && (
          <div className="col-12 text-center">
            <div className="spinner-border text-info m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {posts && posts.length > 0 ? (
          <ListPosts posts={posts} />
        ) : !loading && !error ? (
          <div className="card-glass alert-glass-warning text-center p-4">
            <h4 className="text-warning">No posts found.</h4>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default IndexPosts;
