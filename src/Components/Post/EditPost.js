
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EditFormPost from "./EditFormPost";
import { FaArrowLeft } from "react-icons/fa";

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch post data.");
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {loading && (
          <div className="col-md-8 text-center">
            <div className="spinner-border text-info m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="col-md-8">
            <div className="card-glass alert-glass-danger text-center p-4">
              <h4 className="text-danger mb-3">Error loading post data for editing</h4>
              <p className="text-light mb-3">{error}</p>
              <Link to="/posts" className="btn btn-back-secondary">
                <FaArrowLeft className="me-2" />
                Back to List
              </Link>
            </div>
          </div>
        )}

        {!loading && !error && post?.id && <EditFormPost post={post} />}

        {!loading && !error && (!post || !post.id) && (
          <div className="col-md-8">
            <div className="card-glass alert-glass-warning text-center p-4">
              <h4 className="text-warning mb-3">Post not found for editing.</h4>
              <p className="text-light mb-3">ID: {postId}</p>
              <Link to="/posts" className="btn btn-back-secondary">
                <FaArrowLeft className="me-2" />
                Back to List
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
