import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./nav.css";

export const MainNav = () => {
  const { user } = useSelector((state) => ({
    user: state.authentication.user,
  }));
  return (
    <nav className="navbar navbar-expand-lg nav-fill mainNav">
      <div className="navbar-collapse collapse  order-1 order-md-0 ">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <img className="navbar-brand" src={logo} alt="Dashreel" />
          </li>
        </ul>
      </div>

      <div className="navbar-collapse collapse w-100 order-2 ">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a href="/#" className="nav-link" style={{ fontSize: "18px" }}>
              {" "}
             
            </a>
          </li>
          <li className="nav-item active">
            <h4>
              {" "}
              <Link className="nav-link" to="/home">
                <i className="fas fa-home" />
              </Link>
              &nbsp;
            </h4>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
