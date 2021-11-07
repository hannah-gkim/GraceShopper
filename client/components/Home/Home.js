import React from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Collection from "./Collection";
import FeaturedProduct from "./FeaturedProduct";
import Offer from "./Offer";
import NewArrivals from "./NewArrivals";
import NewsLetter from "./NewsLetter";
import Sponsors from "./Sponsors";

export const Home = () => {
  // const { username } = props;
  return (
    <>
      <div className="home">
        <div className="home__container bd-grid">
          <div className="home__data">
            <h1 className="home__title">
              FREE <br />
              <span>Shipping</span>
            </h1>
            <Link to="/products" className="button">
              GO SHOPPING
            </Link>
          </div>
        </div>
        <img src="/img/home.png" alt="" className="home__img" />
      </div>

      <Collection />
      <FeaturedProduct />
      <Offer />
      <NewArrivals />
      <NewsLetter />
      <Sponsors />
    </>
  );
};

// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };

// export default connect(mapState)(Home);

export default Home;
