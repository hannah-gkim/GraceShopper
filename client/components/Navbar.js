import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import "boxicons";

//  state,  thunk
const Navbar = ({ handleClick, isLoggedIn }) => {
  function showMenu() {
    console.log("clicked");
    
  }
  return (
    <header className="header1">
      <nav className="nav bd-grid">
        <div>
          <Link to="/" className="nav__logo">
            Les Choses de La Vie
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/products" className="nav__link">
                  Shop
                </Link>
              </li>
              <li className="nav__item">
                <a href="#" onClick={handleClick} className="nav__link">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="nav__menu">
            {/*if not loggedIn*/}
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/products" className="nav__link">
                  Shop
                </Link>
              </li>

              <li className="nav__item">
                <Link to="/login" className="nav__link">
                  Login
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/signup" className="nav__link">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        )}
        <div>
          <Link to={`/viewCart`}>
            <box-icon name="cart" className="nav__cart"></box-icon>
          </Link>

          <box-icon
            onClick={showMenu}
            className="nav__toggle"
            name="menu"
          ></box-icon>
        </div>
      </nav>
    </header>
  );
};

/* CONTAINER */
const mapState = (state) => {
  return {
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
