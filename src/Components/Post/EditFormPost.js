import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const EditFormPost = ({ post }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setBody(post.body || "");
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: post.id,
        title,
        body,
        userId: post.userId || 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setError(null);

        Swal.fire({
          title: "Successfully !",
          text: `Post Updated`,
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
          navigate(`/posts/${post.id}`);
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
        <div className="col-md-8">
          <div className="card card-glass border-info shadow-lg">
            <div className="card-header border-info fw-bold text-info d-flex justify-content-between align-items-center py-3">
              <span className="h4 mb-0 d-flex align-items-center">
                <FaEdit className="me-3" />
                Edit Post
              </span>
              <Link
                to={`/posts/${post.id}`}
                className="btn btn-back-secondary d-flex align-items-center"
                title="Back to Post"
              >
                <FaArrowLeft className="me-2" />
                Back to Post
              </Link>
            </div>
            <div className="card-body p-4">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                  <label className="form-label text-info fw-bold">Title</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    className="form-control form-control-glass"
                  />
                  <div className="form-text text-danger">
                    {title ? "" : "Title is Required"}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label text-info fw-bold">Body</label>
                  <textarea
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    className="form-control form-control-glass"
                    rows="6"
                  ></textarea>
                  <div className="form-text text-danger">
                    {body ? "" : "Body is Required"}
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button
                    className="btn btn-edit-glass px-4 fw-bold d-flex align-items-center"
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
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaEdit className="me-2" />
                        Update Post
                      </>
                    )}
                  </button>
                </div>

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

export default EditFormPost;
