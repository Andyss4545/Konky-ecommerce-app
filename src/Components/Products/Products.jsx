import React from "react";
import "../Products/Products.css";
import { FavoriteBorder } from "@mui/icons-material";
import { Star } from "@mui/icons-material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ProductServie from "../../Services/axiosService";
import { useStateValue } from "../../StateProvider/StateProvider";
import Search from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import swal from "sweetalert";

const Products = () => {
  // products to empty array of object
  const [products, setProducts] = useState({});

  // baskets and dispatch items
  const [{ basket }, dispatch] = useStateValue();

  // search Products
  const [filterProducts, setFilterProducts] = useState({});

  // seach value on change
  const [query, setQuery] = useState("");

  // search values
  let searchUpdate = (event) => {
    event.preventDefault();
    setQuery(event.target.value);

    // filter to get all the products
    let theProduct = filterProducts.filter((product) => {
      return (
        // search product by title or name
        product?.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        product?.category
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
        // search product by category
      );
    });

    setProducts(theProduct);
  };

  useEffect(() => {
    // fetch or get all the products from the server
    const fetchProducts = async () => {
      try {
        // response get all the products in the list
        const response = await ProductServie.ProductList();
        setProducts(response.data);
        setFilterProducts(response.data);
      } catch (error) {
        setProducts(error);
      }
    };
    // call the fetchProduct() function
    fetchProducts();
    // run the function nce each time the products are called
  }, []);

  // tell the browser to dispatch items

  // add to cart button
  // let addToBasket = async (item) => {
  //   // dispatch items to basket
  //   dispatch({
  //     type: "ADD_TO_BASKET",
  //     basket: `${item}`,
  //   });

  //   // sweetalert library
  //   swal({
  //     title: "Good job!",
  //     text: "Product added to cart!",
  //     icon: "success",
  //     button: "Okay",
  //   });
  // };

  return (
    <React.Fragment>
      <form className="product_search">
        <div className="product_searchLeft">
          <Search />

          <input
            name="query"
            value={query}
            onChange={searchUpdate}
            type="text"
            placeholder="Search products by name and category..."
          />
        </div>
        <Button>Search</Button>
      </form>
      <div className="product">
        {products?.length > 0 &&
          products?.map((item) => {
            // lets create a default item quantity
            item.quantity = 1;
            return (
              <div key={item?.id} className="product_items">
                <span className="product_promo">-20%</span>
                <Link className="product_link" to={`/product/${item?.id}`}>
                  <img src={item?.image} alt={item?.title} />
                </Link>
                <div className="product_info">
                  <p className="product_title">
                    {" "}
                    <Link to={`/product/${item?.id}`}>
                      {/** the Product title should have 22 letters */}
                      {item?.title?.substring(0, 22)}...
                    </Link>
                  </p>
                  <div className="product_flex1">
                    <h3>
                      $ <span>{item?.price}</span>
                    </h3>

                    <div className="product_rating">
                      {/** round up the Product rating to the nearest whole number */}
                      {Array(Math.round(item?.rating?.rate))
                        .fill()
                        .map(() => {
                          return (
                            <p className="product_star">
                              <Star />
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="product_flex2">
                  <p className="product_cart">
                    <ShoppingCart className="product_shopIcon" />{" "}
                    <span
                      /** Dispatch product in to the basket when  Add to cart button is clicked */
                      onClick={() =>
                        dispatch({
                          type: "ADD_TO_BASKET",
                          basket: item,
                        })
                      }
                    >
                      Add To Cart
                    </span>
                  </p>
                  <FavoriteBorder className="product_favoriteIcon" />
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Products;
