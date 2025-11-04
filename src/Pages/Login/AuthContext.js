import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 3. توابع Login و Logout
  const login = (userData) => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setUser(userData);
    // هدایت کاربر به صفحه اصلی
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUser(null);
    // هدایت کاربر به صفحه لاگین
    navigate("/login");
  };

  // در هر بار بارگذاری صفحه، وضعیت را از localStorage بررسی کن
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. هوک سفارشی برای استفاده راحت از Context
export const useAuth = () => {
  return useContext(AuthContext);
};

