import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../Pages/Login/AuthContext";

const NeonLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 140"
    width="300" // کاهش عرض لوگو
    height="50" // کاهش ارتفاع لوگو
    aria-label="React-SPA Logo"
  >
    <defs>
      <linearGradient id="cyber" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#0dcaf0" />
        <stop offset="50%" stopColor="rgba(13,202,240,0.4)" />
        <stop offset="100%" stopColor="rgba(13,202,240,0.2)" />
      </linearGradient>

      <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur1" />
        <feGaussianBlur stdDeviation="5" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g transform="translate(40,20)" filter="url(#softGlow)">
      <circle
        cx="40"
        cy="50"
        r="38"
        stroke="url(#cyber)"
        strokeWidth="3"
        fill="none"
      />
      <text
        x="24"
        y="66"
        fontSize="56"
        fill="#0dcaf0"
        fontFamily="'Rajdhani', sans-serif"
        fontWeight="700"
        letterSpacing="1px"
      >
        R
      </text>

      <line
        x1="78"
        y1="35"
        x2="125"
        y2="35"
        stroke="#0dcaf0"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="78"
        y1="50"
        x2="135"
        y2="50"
        stroke="#0dcaf0"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="78"
        y1="65"
        x2="120"
        y2="65"
        stroke="#0dcaf0"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
    </g>

    <g transform="translate(180,80)" filter="url(#softGlow)">
      <text
        fontSize="60"
        fill="url(#cyber)"
        fontFamily="'Rajdhani', sans-serif"
        fontWeight="700"
        letterSpacing="1px"
      >
        React-SPA
      </text>
    </g>
  </svg>
);

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-info p-1 shadow-sm sticky-top">
      <div className="container-fluid">
        {/* 1. لوگو */}
        <Link
          className="navbar-brand d-flex align-items-center fw-bold"
          to={isLoggedIn ? "/" : "/login"}
        >
          <NeonLogo />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isLoggedIn && (
            <ul className="navbar-nav position-absolute start-50 translate-middle-x">
              <li className="nav-item mx-2">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "nav-link active" : "nav-link"
                  }
                  to="/users"
                >
                  Users
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/posts">
                  Posts
                </NavLink>
              </li>
            </ul>
          )}

          <div className="ms-auto d-flex">
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className="btn btn-info me-2 fw-bold">
                  LOGIN
                </NavLink>
              </>
            ) : (
              <button onClick={logout} className="btn btn-danger fw-bold">
                LOGOUT
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
