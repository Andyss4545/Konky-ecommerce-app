import React from "react";
import Products from "../../Products/Products";

const AllProducts = () => {
  return (
    <React.Fragment>
      <div className="home">
        <Products products="products" />
      </div>
    </React.Fragment>
  );
};

export default AllProducts;
