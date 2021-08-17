import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Collection from "./Collection";
import FeaturedProduct from "./FeaturedProduct";

export const Home = (props) => {
  const { username } = props;
  return (
    <>
      <div className="home">
        <div className="home__container bd-grid">
          <div className="home__data">
            <h1 className="home__title">
              NEW <br />
              <span>ARRIVALS</span>
            </h1>

            <Link to="/products">
              <a href="#featured" className="button">
                GO SHOPPING
              </a>
            </Link>
          </div>

          <img src="/img/home.png" alt="" className="home__img" />
        </div>
      </div>
      <Collection />
      <FeaturedProduct />
    </>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
