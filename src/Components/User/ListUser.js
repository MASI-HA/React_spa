import {
  FaFingerprint,
  FaAt,
  FaMobileAlt,
  FaLink,
  FaMicrochip,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ListUser = ({ users }) => {
  return (
    <>
      {users &&
        users.map((user) => (
          <div className="col-md-4 mb-4 " key={user.id}>
            <div className="card border-info bg-dark text-light">
              <div className="card-header border-info fw-bold text-info d-flex justify-content-between align-items-center">
                <span>
                  <FaFingerprint className="me-2" />
                  {user.name}
                </span>

                <Link
                  to={`/users/${user.id}`}
                  className="text-info text-decoration-none p-1"
                  title="View System Data"
                >
                  <FaMicrochip className="ms-1 fs-5" />
                </Link>
              </div>

              <div className="card-body bg-black">
                <h6 className="text-info">
                  <FaFingerprint className="me-2" />@{user.username}
                </h6>
                <p className="mb-2">
                  <FaAt className="me-2 text-info" />
                  <small>{user.email}</small>
                </p>
                <p className="mb-2">
                  <FaMobileAlt className="me-2 text-info" />
                  <small>{user.phone}</small>
                </p>
                <p className="mb-0">
                  <FaLink className="me-2 text-info" />
                  <small>{user.website}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ListUser;
