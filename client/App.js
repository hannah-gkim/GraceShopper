import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div className="main-div">
      <div className="navbar-top">
        <div className="p-div">
          <p>
            FREE shipping on orders $75+ | Register for FREE Shipping on Your
            1st Order
          </p>
        </div>
      </div>

      <Navbar />
      <hr></hr>
      <div className="content-div">
        <Routes />
      </div>
    </div>
  );
};

export default App;
