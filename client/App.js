import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Footer from "./components/Home/Footer";
import Sponsors from "./components/Home/Sponsors";
import NewsLetter from "./components/Home/NewsLetter";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <NewsLetter />
      <Sponsors />
      <Footer />
    </div>
  );
};

export default App;
