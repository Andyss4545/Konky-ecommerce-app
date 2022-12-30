import React from "react";
import Header from "../Header/Header";
import "../Home/Home.css";
import Products from "../Products/Products";
import Sliders from "../Sliders/Sliders";

const Home = () => {
  return (
    <React.Fragment>
      <div className="home">
        <Sliders />
        <Products products="products" />
      </div>
    </React.Fragment>
  );
};

export default Home;
