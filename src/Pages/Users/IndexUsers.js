import React, { useState, useEffect } from "react";
import { FaUser, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const IndexUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const limitedUsers = data.slice(0, 9);
        setUsers(limitedUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
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
      <h2 className="text-info mb-4 fw-bold">Users :</h2>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 border-info shadow-lg card-glass">
              {/* Card Header */}
              <div className="card-header border-info fw-bold text-info d-flex justify-content-between align-items-center py-3">
                <span className="h5 mb-0">
                  <FaUser className="me-2" />
                  {user.name}
                </span>
              </div>

              {/* Card Body */}
              <div className="card-body text-light">
                <p className="mb-1">
                  <i className="bi bi-at me-2 text-info"></i>@{user.username}
                </p>
                <p className="mb-1">
                  <FaEnvelope className="me-2 text-info" />
                  {user.email}
                </p>
                <p className="mb-1">
                  <FaPhone className="me-2 text-info" />
                  {user.phone.split(" ")[0]}
                </p>
                <p className="mb-3">
                  <FaGlobe className="me-2 text-info" />
                  {user.website}
                </p>

                <Link
                  to={`/users/${user.id}`}
                  className="btn btn-sm btn-outline-info fw-bold w-100 mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexUsers;
