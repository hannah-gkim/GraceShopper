import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Nav, Logo, NavItems, NavItemsRed } from "../style";

//  state,  thunk
const Navbar = ({ handleClick, isLoggedIn }) => (
  <Nav>
    <Logo>
      <Link to="/">Les Choses de La Vie</Link>
    </Logo>
    {isLoggedIn ? (
      <div className="nav-items">
        <NavItems>
          <Link to="/products">Shop</Link>
        </NavItems>
        <NavItems>
          <Link to={`/viewCart`}>Cart</Link>
        </NavItems>
        <NavItems>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </NavItems>
      </div>
    ) : (
      <div>
        {/*if not loggedIn*/}
        <NavItems>
          <Link to="/products">Shop</Link>
        </NavItems>
        <NavItems>
          <Link to={`/viewCart`}>Cart</Link>
        </NavItems>
        <NavItems>
          <Link to="/login">Login</Link>
        </NavItems>
        <NavItems>
          <Link to="/signup">Sign Up</Link>
        </NavItems>
      </div>
    )}
  </Nav>
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
