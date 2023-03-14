import React, { useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import Logo from "../../../images/homedelivery.svg";
import BJSLogo from "../../../images/BJSLogo.png";
import { useSelector } from "react-redux";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const NavHader = () => {
  const role = useSelector((state) => state.auth.auth.role);
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } =
    useContext(ThemeContext);

  const DashBoardLink = () => {
    switch (role) {
      case USER_ROLES.SUPER_ADMIN:
        return "dashboard";
        break;
      case USER_ROLES.COMPANY:
        return "departments";
        break;
      case USER_ROLES.INSTRUCTOR:
        return "instructor-dashboard";
        break;
      case USER_ROLES.INSTRUCTOR:
        return;
      default:
        return "profile";
        break;
    }
  };

  return (
    <div className="nav-header">
      <Link to={`/${DashBoardLink()}`} className="brand-logo">
        {background.value === "dark" || navigationHader !== "color_1" ? (
          <>
            <img alt="images" width={40} src={BJSLogo} />
          </>
        ) : (
          <>
            <img alt="images" width={40} src={BJSLogo} />
          </>
        )}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
