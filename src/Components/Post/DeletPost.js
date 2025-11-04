import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const DeletePost = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const deleteRequest = () => {
    setLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete post.");
        }
      })
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Successfully!",
          text: `Post ID ${postId} has been deleted.`,
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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#0dcaf0",
      confirmButtonText: "Yes, delete it!",
      background: "rgba(20, 20, 30, 0.95)",
      color: "#f8f9fa",
      customClass: {
        popup: "border border-danger shadow-lg",
        title: "text-light",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest();
      }
    });
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="btn btn-delete-glass px-3 fw-bold d-flex align-items-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <div
              className="spinner-border spinner-border-sm me-2"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            Deleting...
          </>
        ) : (
          <>
            <FaTrash className="me-2" />
            Delete
          </>
        )}
      </button>
      {error && (
        <div className="mt-2 fw-bold text-danger text-center">{error}</div>
      )}
    </>
  );
};

export default DeletePost;
