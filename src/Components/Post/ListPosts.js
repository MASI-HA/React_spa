import { FaBookOpen, FaCubes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ListPosts = ({ posts }) => {
  return (
    <>
      <div className="row g-3 d-flex align-items-stretch">
        {posts &&
          posts.map((post) => (
            <div className="col-md-4 mb-4" key={post.id}>
              <div className="card card-glass border-info h-100">
                <div
                  className="card-header border-info fw-bold text-info d-flex justify-content-between align-items-center"
                  style={{ minHeight: "55px" }}
                >
                  <span className="d-flex align-items-center">
                    <FaBookOpen className="me-2" />
                    {post.title.length > 30
                      ? post.title.substring(0, 30) + "..."
                      : post.title}
                  </span>

                  <Link
                    to={`/posts/${post.id}`}
                    className="btn btn-view-glass p-2"
                    title="View Post Details"
                  >
                    <FaCubes className="fs-6" />
                  </Link>
                </div>

                <div className="card-body">
                  <p className="text-light mb-0">
                    {post.body.length > 100
                      ? post.body.substring(0, 100) + "..."
                      : post.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ListPosts;
