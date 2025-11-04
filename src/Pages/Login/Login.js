import { useState } from "react";
import { Link } from "react-router-dom";
// 💡 FIX: مسیردهی اصلاح شد چون AuthContext و Login در یک پوشه‌اند 💡
import { useAuth } from "../AuthContext";

const Login = () => {
  // استفاده از Auth Context
  const { login } = useAuth(); // 🚨 استفاده از تابع login 🚨

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login attempt with:", { email, password });

    // 🚨 شبیه‌سازی لاگین موفق 🚨
    setTimeout(() => {
      setLoading(false);

      // فراخوانی تابع login برای به‌روزرسانی Context و ریدایرکت به Home
      login({ email: email });
    }, 1500);
  };

  return (
    // 🚨 حالت با اسکرول فعال (padding: '10vh 0') 🚨
    <div
      className="login-container-wrapper d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", padding: "10vh 0" }}
    >
      {/* استفاده از کلاس‌های گرید: در موبایل (col-12) و در دسکتاپ (col-lg-4) */}
      <div className="col-12 col-sm-10 col-md-6 col-lg-4 p-3">
        <div className="login-final-card p-4">
          <div className="text-center mb-4">
            <h2 className="text-info-glow">
              <i className="bi bi-person-circle me-2"></i>
              LOGIN ACCOUNT
            </h2>
            <p className="text-secondary small">
              Please enter your username and password
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* فیلد ایمیل */}
            <div className="mb-3 position-relative">
              <i className="bi bi-person-fill input-icon-attractive"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control ps-5"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* فیلد رمز عبور */}
            <div className="mb-4 position-relative">
              <i className="bi bi-lock-fill input-icon-attractive"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control ps-5"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* دکمه ورود (LOGIN) */}
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
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    <i className="bi bi-lock-fill me-2"></i>
                    LOGIN
                  </>
                )}
              </button>
            </div>

            {/* لینک‌های زیرین */}
            <div className="text-center mt-3 small">
              <Link
                to="/forgot-password"
                className="text-secondary opacity-75 text-decoration-none me-4"
              >
                Forgot Password?
              </Link>
              <Link to="/register" className="text-info text-decoration-none">
                Register Now!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
