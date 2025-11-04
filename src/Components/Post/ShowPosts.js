import {
  FaBookOpen,
  FaUser,
  FaArrowLeft,
  FaCalendarAlt,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShowPosts = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      background: "rgba(20, 20, 30, 0.95)",
      color: "#f8f9fa",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#0dcaf0",
      customClass: {
        popup: "border border-danger shadow-lg",
        title: "text-light",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: "DELETE",
        })
          .then(() => {
            Swal.fire({
              title: "Deleted !",
              text: "Post has been deleted.",
              icon: "success",
              background: "rgba(20, 20, 30, 0.95)",
              color: "#f8f9fa",
              confirmButtonColor: "#0dcaf0",
              customClass: {
                popup: "border border-info shadow-lg",
                title: "text-info",
              },
            });
            navigate("/posts");
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "An error occurred during deletion.",
              icon: "error",
              background: "rgba(20, 20, 30, 0.95)",
              color: "#f8f9fa",
              confirmButtonColor: "#dc3545",
              customClass: {
                popup: "border border-danger shadow-lg",
                title: "text-danger",
              },
            });
          });
      }
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        {loading && (
          <div className="col-md-10 text-center">
            <div className="spinner-border text-info m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="col-md-10">
            <div className="card-glass alert-glass-danger text-center p-4">
              <h4 className="text-danger mb-3">Error loading post</h4>
              <p className="text-light mb-3">{error}</p>
              <Link to="/posts" className="btn btn-back-secondary">
                <FaArrowLeft className="me-2" />
                Back to Posts List
              </Link>
            </div>
          </div>
        )}
        {!loading && !error && !post && (
          <div className="col-md-10">
            <div className="card-glass alert-glass-warning text-center p-4">
              <h4 className="text-warning mb-3">Post Not Found</h4>
              <Link to="/posts" className="btn btn-back-secondary">
                <FaArrowLeft className="me-2" />
                Back to List
              </Link>
            </div>
          </div>
        )}

        {/* Post Data */}
        {!loading && !error && post && (
          <div className="col-md-10">
            <div className="card card-glass border-info shadow-lg">
              {/* Header */}
              <div className="card-header border-info fw-bold text-info d-flex justify-content-between align-items-center py-3">
                <span className="h4 mb-0 d-flex align-items-center">
                  <FaBookOpen className="me-3" />
                  {post.title}
                </span>

                <div className="d-flex gap-2">
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-edit-glass px-3 fw-bold d-flex align-items-center"
                    title="Edit Post"
                  >
                    <FaEdit className="me-1" />
                    Edit
                  </Link>

                  <button
                    onClick={handleDelete}
                    className="btn btn-delete-glass px-3 fw-bold d-flex align-items-center"
                    title="Delete Post"
                  >
                    <FaTrashAlt className="me-1" />
                    Delete
                  </button>

                  <Link
                    to="/posts"
                    className="btn btn-back-secondary px-3 fw-bold d-flex align-items-center"
                    title="Back to Posts"
                  >
                    <FaArrowLeft className="me-1" />
                    Back to List
                  </Link>
                </div>
              </div>

              <div className="card-body p-4">
                {/* Post Content */}
                <div className="mb-4 section-glass-inner p-4">
                  <h6 className="text-info mb-3 border-bottom border-info pb-2 d-flex align-items-center">
                    <FaBookOpen className="me-2" />
                    Post Content
                  </h6>
                  <p className="lead text-light">{post.body}</p>
                </div>

                {/* Post Metadata */}
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="section-glass-inner p-4 text-center">
                      <h6 className="text-info mb-3 border-bottom border-info pb-2">
                        Author & ID Information
                      </h6>

                      <div className="user-info-item mb-2">
                        <FaCalendarAlt className="me-2 text-info" />
                        <strong className="text-info">Post ID:</strong>
                        <span className="text-light ms-2">{post.id}</span>
                      </div>

                      <div className="user-info-item">
                        <FaUser className="me-2 text-info" />
                        <strong className="text-info">Author ID:</strong>
                        <span className="text-light ms-2">{post.userId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowPosts;
