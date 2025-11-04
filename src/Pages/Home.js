import { Link } from "react-router-dom";
import Users from "../Button/UsersBtn";
import Posts from "../Button/PostsBtn";

const Home = () => {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <div className="home-glass-card p-5">
            {/* Title */}
            <h1 className="home-title mb-4">
              Welcome To <span className="text-info">React-SPA</span>
            </h1>

            {/* Description */}
            <div className="home-description mb-4">
              <p className="home-subtitle mb-3">
                <span className="highlight-text">React</span>
                <span className="persian-text"> ساخته شده با </span>
              </p>
              <p className="home-text" > پلتفرم مدرن نمایش و مدیریت داده‌ ها  </p>
            </div>

            {/* Instruction */}
            <p className="home-instruction mb-5">
              برای شروع، می‌توانید لیست کاربران یا پست‌ها را مشاهده کنید و با
              استفاده از دکمه‌های زیر وارد بخش مورد نظر شوید
            </p>

            {/* Buttons */}
            <div className="home-buttons d-flex gap-4 justify-content-center">
              <Link to="/users" className="text-decoration-none">
                <Users />
              </Link>
              <Link to="/posts" className="text-decoration-none">
                <Posts />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
