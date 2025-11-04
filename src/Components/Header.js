import { NavLink } from "react-router-dom";
// 💡 FIX: مسیردهی اصلاح شد. فرض می‌شود AuthContext در پوشه src قرار دارد، بنابراین فقط یک سطح به عقب می‌رویم. 💡
// اگر AuthContext.js در src/Pages/Login باشد، مسیر صحیح همان ../Pages/Login/AuthContext بود.
import { useAuth } from "../AuthContext";

// لوگوی نئونی (بهینه شده برای نمایش بهتر در موبایل)
const NeonLogo = () => (
  <>
    {" "}
    {/* 💡 FIX: اضافه کردن Fragment برای داشتن یک المان ریشه واحد 💡 */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 40"
      width="160" // اندازه مناسب دسکتاپ
      height="40"
      aria-label="React-SPA Logo"
      className="d-none d-sm-block" // مخفی کردن در کوچکترین نمایشگر (sm)
    >
      <defs>
        <linearGradient id="cyber" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0dcaf0" />
          <stop offset="50%" stopColor="rgba(13,202,240,0.4)" />
          <stop offset="100%" stopColor="rgba(13,202,240,0.2)" />
        </linearGradient>

        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur1" />
          <feGaussianBlur stdDeviation="3" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform="translate(1, -5)" filter="url(#softGlow)">
        <circle
          cx="15"
          cy="25"
          r="14"
          stroke="url(#cyber)"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="8"
          y="30"
          fontSize="18"
          fill="#0dcaf0"
          fontFamily="'Rajdhani', sans-serif"
          fontWeight="700"
          letterSpacing="0.5px"
        >
          R
        </text>
      </g>

      <g transform="translate(35,17)" filter="url(#softGlow)">
        <text
          fontSize="18"
          fill="url(#cyber)"
          fontFamily="'Rajdhani', sans-serif"
          fontWeight="700"
          letterSpacing="0.5px"
        >
          React-SPA
        </text>
      </g>
    </svg>
    {/* لوگوی موبایل (کوچکتر) */}
    <span className="navbar-brand fw-bold text-info fs-4 d-sm-none">SPA</span>
  </> // 💡 FIX: پایان Fragment 💡
);

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  // کلاس‌های NavLink برای فعال بودن (Active State)
  const navLinkClasses = ({ isActive }) =>
    isActive ? "nav-link active-link-custom fw-bold" : "nav-link fw-bold";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top border-bottom border-info header-custom-style">
      <div className="container-fluid">
        {/* ۱. لوگو */}
        <NavLink
          className="navbar-brand d-flex align-items-center me-4"
          to={isLoggedIn ? "/" : "/login"}
        >
          <NeonLogo />
        </NavLink>

        {/* ۲. دکمه همبرگری (فقط در نمایشگرهای کوچک) */}
        {isLoggedIn && (
          <button
            className="navbar-toggler me-2" // margin-end برای جدا شدن از دکمه لاگ اوت
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {/* ۳. دکمه‌های احراز هویت (همیشه در گوشه راست) */}
        <div className="d-flex order-lg-last">
          {!isLoggedIn ? (
            // 🔒 حالت Pre-Login
            <>
              <NavLink
                to="/login"
                className="btn btn-info me-2 fw-bold btn-auth-custom btn-sm"
              >
                <i className="bi bi-box-arrow-in-right me-1 d-lg-none"></i>{" "}
                <span className="d-none d-sm-inline">LOGIN</span>
              </NavLink>
              {/* دکمه Register را در موبایل مخفی می‌کنیم تا فضا باز شود */}
              <NavLink
                to="/register"
                className="btn btn-outline-info fw-bold btn-auth-custom btn-sm d-none d-md-inline"
              >
                REGISTER
              </NavLink>
            </>
          ) : (
            // ✅ حالت Post-Login: نمایش Logout
            <button
              onClick={logout}
              className="btn btn-danger fw-bold btn-logout-custom btn-sm"
            >
              <i className="bi bi-box-arrow-right me-1 d-lg-none"></i>{" "}
              <span className="d-none d-sm-inline">LOGOUT</span>
            </button>
          )}
        </div>

        {/* ۴. لینک‌های ناوبری (وسط چین شده در دسکتاپ، زیر همبرگر در موبایل) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0 w-100 justify-content-lg-center">
            {isLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <NavLink className={navLinkClasses} to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className={navLinkClasses} to="/users">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className={navLinkClasses} to="/posts">
                    Posts
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
