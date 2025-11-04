import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      tempErrors.email = "Email address is required.";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      tempErrors.email =
        "Please enter a valid email address (e.g., user@example.com).";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    console.log("Login attempt with:", { email, password });

    setTimeout(() => {
      setLoading(false);
      login({ email: email });
    }, 1500);
  };

  return (
    <div
      className="login-container-wrapper d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", padding: "10vh 0" }}
    >
      <div className="col-12 col-sm-10 col-md-6 col-lg-4 p-3">
        <div className="login-final-card p-4 p-md-5 text-light mx-3">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-info mb-3 d-flex align-items-center justify-content-center">
              <i
                className="bi bi-person-badge me-3"
                style={{ fontSize: "1.5rem" }}
              ></i>
              USER LOGIN
            </h2>
            <p className="text-secondary opacity-75">
              Access your account securely
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 position-relative">
              <label className="form-label text-info fw-bold mb-2">
                <i className="bi bi-envelope me-2"></i> Email Address
              </label>
              <span className="input-icon-attractive">
                <i className="bi bi-at"></i>
              </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className={`form-control ps-5 ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-5 position-relative">
              <label className="form-label text-info fw-bold mb-2">
                <i className="bi bi-key me-2"></i> Password
              </label>
              <span className="input-icon-attractive">
                <i className="bi bi-fingerprint"></i>
              </span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className={`form-control ps-5 ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-login-attractive py-2 d-flex align-items-center justify-content-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    LOGIN ...
                  </>
                ) : (
                  <>
                    <i className="bi bi-lock-fill me-2"></i>
                    LOGIN
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
