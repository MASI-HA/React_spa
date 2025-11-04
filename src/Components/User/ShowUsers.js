import {
  FaFingerprint,
  FaAt,
  FaMobileAlt,
  FaLink,
  FaSatelliteDish,
  FaIndustry,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ShowUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        {/* Loading State */}
        {loading && (
          <div className="col-md-6 text-center">
            <div className="spinner-border text-info m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="col-md-6">
            <div className="card-glass alert-glass-danger text-center p-4">
              <h4 className="text-danger mb-3">Error loading user</h4>
              <p className="text-light mb-3">{error}</p>
              <Link to="/users" className="btn btn-back-secondary">
                <FaArrowLeft className="me-2" />
                Back to List
              </Link>
            </div>
          </div>
        )}

        {/* User Not Found */}
        {!loading && !error && !user && (
          <div className="col-md-6">
            <div className="card-glass alert-glass-warning text-center p-4">
              <h4 className="text-warning mb-3">User Not Found</h4>
              <Link to="/users" className="btn btn-back-secondary">
                <FaArrowLeft className="me-2" />
                Back to List
              </Link>
            </div>
          </div>
        )}

        {/* User Data */}
        {!loading && !error && user && (
          <div className="col-md-10">
            <div className="card card-glass border-info shadow-lg">
              {/* Header */}
              <div className="card-header border-info fw-bold text-info d-flex justify-content-between align-items-center py-3">
                <span className="h4 mb-0 d-flex align-items-center">
                  <FaFingerprint className="me-3" />
                  {user.name}
                </span>
                <Link
                  to="/users"
                  className="btn btn-back-secondary d-flex align-items-center"
                  title="Back to Users"
                >
                  <FaArrowLeft className="me-2" />
                  Back to List
                </Link>
              </div>

              {/* Body */}
              <div className="card-body p-4">
                {/* Basic Info */}
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <div className="section-glass-inner p-4 h-100">
                      <h6 className="text-info mb-3 border-bottom border-info pb-2 d-flex align-items-center">
                        <FaFingerprint className="me-2" />
                        Basic Information
                      </h6>
                      <div className="user-info-item mb-3">
                        <FaFingerprint className="me-2 text-info" />
                        <strong className="text-info">Username:</strong>
                        <span className="text-light ms-2">
                          @{user.username}
                        </span>
                      </div>
                      <div className="user-info-item mb-3">
                        <FaAt className="me-2 text-info" />
                        <strong className="text-info">Email:</strong>
                        <span className="text-light ms-2">{user.email}</span>
                      </div>
                      <div className="user-info-item mb-3">
                        <FaMobileAlt className="me-2 text-info" />
                        <strong className="text-info">Phone:</strong>
                        <span className="text-light ms-2">{user.phone}</span>
                      </div>
                      <div className="user-info-item">
                        <FaLink className="me-2 text-info" />
                        <strong className="text-info">Website:</strong>
                        <span className="text-light ms-2">{user.website}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    {/* Address Section */}
                    {user.address && (
                      <div className="section-glass-inner p-4 h-100">
                        <h6 className="text-info mb-3 border-bottom border-info pb-2 d-flex align-items-center">
                          <FaMapMarkerAlt className="me-2" />
                          Address Information
                        </h6>
                        <div className="user-info-item mb-2">
                          <strong className="text-info">Street:</strong>
                          <span className="text-light ms-2">
                            {user.address.street}
                          </span>
                        </div>
                        <div className="user-info-item mb-2">
                          <strong className="text-info">Suite:</strong>
                          <span className="text-light ms-2">
                            {user.address.suite}
                          </span>
                        </div>
                        <div className="user-info-item mb-2">
                          <strong className="text-info">City:</strong>
                          <span className="text-light ms-2">
                            {user.address.city}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Section */}
                {user.company && (
                  <div className="section-glass-inner p-4">
                    <h6 className="text-info mb-3 border-bottom border-info pb-2 text-center d-flex align-items-center justify-content-center">
                      <FaBuilding className="me-2" />
                      Company Information
                    </h6>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex justify-content-center align-items-center gap-5">
                          <div className="company-info-item text-center">
                            <strong className="text-info d-block mb-1">
                              Company Name
                            </strong>
                            <span className="text-light">
                              {user.company.name}
                            </span>
                          </div>

                          <div className="company-info-item text-center">
                            <strong className="text-info d-block mb-1">
                              Business
                            </strong>
                            <span className="text-light small">
                              {user.company.bs}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowUser;
