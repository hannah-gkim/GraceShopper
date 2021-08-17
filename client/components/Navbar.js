import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import "boxicons";

//  state,  thunk
class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
    };
    this.toggleHidden.bind(this);
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  hideMenu() {
    this.setState({
      isHidden: true,
    });
  }

  render() {
    return (
      <header className="header1">
        <nav className="nav bd-grid">
          <div onClick={this.hideMenu.bind(this)}>
            <Link to="/" className="nav__logo">
              Les Choses de La Vie
            </Link>
          </div>

          <div>
            <Link to={`/viewCart`} onClick={this.hideMenu.bind(this)}>
              <box-icon name="cart" className="nav__cart"></box-icon>
            </Link>

            <box-icon
            onClick={this.toggleHidden.bind(this)}
              className="nav__toggle"
              name="menu"
            ></box-icon>
            {!this.state.isHidden &&
              (this.props.isLoggedIn ? (
                <div className="nav__menu">
                  <ul className="nav__list">
                    <li className="nav__item">
                      <Link
                        to="/products"
                        className="nav__link"
                        onClick={this.hideMenu.bind(this)}
                      >
                        Shop
                      </Link>
                    </li>
                    <li
                      className="nav__item"
                      onClick={this.hideMenu.bind(this)}
                    >
                      <a
                        href="#"
                        onClick={this.props.handleClick}
                        className="nav__link"
                      >
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
                      <Link
                        to="/products"
                        className="nav__link"
                        onClick={this.hideMenu.bind(this)}
                      >
                        Shop
                      </Link>
                    </li>

                    <li className="nav__item">
                      <Link
                        to="/login"
                        className="nav__link"
                        onClick={this.hideMenu.bind(this)}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav__item">
                      <Link
                        to="/signup"
                        className="nav__link"
                        onClick={this.hideMenu.bind(this)}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </nav>
      </header>
    );
  }
}

// const Child = ({ isLoggedIn, handleClick }) => {
//   return isLoggedIn ? (
//     <div className="nav__menu">
//       <ul className="nav__list">
//         <li className="nav__item">
//           <Link to="/products" className="nav__link">
//             Shop
//           </Link>
//         </li>
//         <li className="nav__item">
//           <a href="#" onClick={handleClick} className="nav__link">
//             Logout
//           </a>
//         </li>
//       </ul>
//     </div>
//   ) : (
//     <div className="nav__menu">
//       {/*if not loggedIn*/}
//       <ul className="nav__list">
//         <li className="nav__item">
//           <Link to="/products" className="nav__link">
//             Shop
//           </Link>
//         </li>

//         <li className="nav__item">
//           <Link to="/login" className="nav__link">
//             Login
//           </Link>
//         </li>
//         <li className="nav__item">
//           <Link to="/signup" className="nav__link">
//             Sign Up
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

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
