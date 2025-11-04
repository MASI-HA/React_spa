import { useState } from "react";
import Swal from "sweetalert2";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setError(null);
        setTitle("");
        setBody("");

        Swal.fire({
          title: "Successfully !",
          text: "Post created",
          icon: "success",
          confirmButtonText: "Ok",
          background: "rgba(20, 20, 30, 0.95)",
          color: "#f8f9fa",
          confirmButtonColor: "#0dcaf0",
          customClass: {
            popup: "border border-info shadow-lg",
            title: "text-info",
          },
        }).then(() => {
          navigate("/posts");
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);

        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Ok",
          background: "rgba(20, 20, 30, 0.95)",
          color: "#f8f9fa",
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "border border-danger shadow-lg",
            title: "text-danger",
          },
        });
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card card-glass border-info shadow-lg">
            {/* Header */}
            <div className="card-header border-info fw-bold text-info d-flex justify-content-between align-items-center py-3">
              <span className="h4 mb-0 d-flex align-items-center">
                <FaPaperPlane className="me-3" />
                Create New Post
              </span>
              <Link
                to="/posts"
                className="btn btn-back-secondary d-flex align-items-center"
                title="Back to Posts"
              >
                <FaArrowLeft className="me-2" />
                Back to List
              </Link>
            </div>

            {/* Body */}
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="mb-4">
                  <label className="form-label text-info fw-bold mb-3">
                    Post Title
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    value={title}
                    className="form-control form-control-glass"
                    placeholder="Enter post title..."
                  />
                  <div className="form-text text-danger mt-2">
                    {title ? "" : "Title is Required"}
                  </div>
                </div>

                {/* Body Field */}
                <div className="mb-4">
                  <label className="form-label text-info fw-bold mb-3">
                    Post Content
                  </label>
                  <textarea
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    className="form-control form-control-glass"
                    rows="6"
                    placeholder="Write your post content here..."
                  ></textarea>
                  <div className="form-text text-danger mt-2">
                    {body ? "" : "Body is Required"}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button
                    className="btn btn-create-glass px-4 fw-bold d-flex align-items-center"
                    type="submit"
                    disabled={title === "" || body === "" || loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Create Post
                      </>
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-4 fw-bold text-danger text-center">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
