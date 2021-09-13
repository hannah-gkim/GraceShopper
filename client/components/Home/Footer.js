import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import "boxicons";

function Footer({ isLoggedIn, handleClick }) {
  return (
    <footer className="footer section">
      <div className="footer__container bd-grid">
        <div className="footer__box">
          <h3 className="footer__title">Les Choses de La Vie</h3>
          <a href="#">
            <img src="/img/footerstore1.png" alt="" className="footer__store" />
          </a>
          <a href="#">
            <img src="/img/footerstore2.png" alt="" className="footer__store" />
          </a>
        </div>
        {/* Explore */}
        <div className="footer__box">
          <h3 className="footer__title">EXPLORE</h3>
          <ul>
            <li>
              <Link to="/home" className="footer__link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="footer__link">
                Shop
              </Link>
            </li>

            {isLoggedIn ? (
              <li>
                <Link to="/" onClick={handleClick} className="footer__link">
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="footer__link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="footer__link">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Follow */}
        <div className="footer__box">
          <h3 className="footer__title">FOLLOW</h3>
          <a
            href="https://github.com/hannah-gkim"
            target="_blank"
            className="footer__social"
          >
            <box-icon type="logo" name="github" color="#606060"></box-icon>
          </a>

          <a
            href="https://www.linkedin.com/in/hannah-gkim/"
            target="_blank"
            className="footer__social"
          >
            <box-icon
              type="logo"
              name="linkedin-square"
              color="#606060"
            ></box-icon>
          </a>

          <a
            href="https://www.youtube.com/channel/UC_Fa6yrspcGcdNWEZnJmz1g"
            target="_blank"
            className="footer__social"
          >
            <box-icon name="youtube" type="logo" color="#606060"></box-icon>
          </a>
        </div>
      </div>
      <p className="footer__copy">&#169; 2021 copyright all right reserved</p>
    </footer>
  );
}

const mapState = (state) => {
  return {
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

export default connect(mapState, mapDispatch)(Footer);
