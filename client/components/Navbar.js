import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import "boxicons";

//  state,  thunk
function Navbar({ isLoggedIn, handleClick }) {
  const [isActive, setIsActive] = useState("false");

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const hideMenu = () => {
    setIsActive("false");
  };

  return (
    <header className="header1">
      <nav className="nav bd-grid">
        <div>
          <Link to="/" className="nav__logo" onClick={hideMenu}>
            Les Choses de La Vie
          </Link>
        </div>

        <div className={isActive ? "nav__menu" : "show"}>
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link" onClick={hideMenu}>
                Home
              </Link>
            </li>

            <li className="nav__item">
              <Link to="/products" className="nav__link" onClick={hideMenu}>
                Shop
              </Link>
            </li>

            <li className="nav__item">
              <Link to={`/viewCart`} className="nav__link" onClick={hideMenu}>
                Cart
              </Link>
            </li>

            {isLoggedIn ? (
              <li className="nav__item" onClick={hideMenu}>
                <Link to="/" onClick={handleClick} className="nav__link">
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav__item active">
                  <Link to="/login" className="nav__link" onClick={hideMenu}>
                    Login
                  </Link>
                </li>
                <li className="nav__item active">
                  <Link to="/signup" className="nav__link" onClick={hideMenu}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="cart-menu-icon">
          <Link to={`/viewCart`} onClick={hideMenu}>
            <box-icon name="cart" className="nav__cart"></box-icon>
          </Link>
          <div className="nav__toggle " onClick={toggleMenu}>
            <box-icon name="menu"></box-icon>
          </div>
        </div>
      </nav>
    </header>
  );
}

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
