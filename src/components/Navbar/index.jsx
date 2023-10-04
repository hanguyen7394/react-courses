import { NavLink } from "react-router-dom";
import { PATH } from "../../constant/common";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__main">
        <li className="navbar__link">
          <NavLink end to={PATH.HOME} className="navbar__item">
            Trang chủ
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to={PATH.ABOUT} className="navbar__item">
            Về CFD Circle
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to={PATH.COURSE.INDEX} className="navbar__item">
            Khóa học
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to={PATH.BLOG.INDEX} className="navbar__item">
            Bài viết
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to={PATH.CONTACT} className="navbar__item">
            Liên hệ
          </NavLink>
        </li>
      </ul>
      <div className="navbar__overlay" />
    </nav>
  );
};

export default Navbar;

