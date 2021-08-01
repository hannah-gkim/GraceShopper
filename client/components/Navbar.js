import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

//  state,  thunk
const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="nav">
    <div className="nav-wrap">
      <div className="nav-logo">
        <Link to="/">Les Choses de La Vie</Link>
      </div>
      {isLoggedIn ? (
        <div className="nav-items">
          <Link to="/products">Shop</Link>
          <Link to={`/viewCart`}>Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/*if not loggedIn*/}
          <div className="nav-items">
            <Link to="/products">Shop</Link>
            <Link to={`/viewCart`}>Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  </nav>
);

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
