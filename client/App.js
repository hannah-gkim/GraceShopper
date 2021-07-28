import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { FixedHeightContainer, Content } from "./style";
const App = () => {
  return (
    <FixedHeightContainer>
      <div className="navbar-top">
        <p>
          FREE shipping on orders $75+ | Register for FREE Shipping on Your 1st
          Order
        </p>
      </div>
      <Navbar />
      <hr></hr>
      <Content>
        <Routes />
      </Content>
    </FixedHeightContainer>
  );
};

export default App;
