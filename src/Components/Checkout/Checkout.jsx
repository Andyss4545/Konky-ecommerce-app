import React from "react";
import "../Checkout/Checkout.css";
import { Star } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SubTotal from "./SubTotal";
import { useStateValue } from "../../StateProvider/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Checkout = () => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  console.log(basket);

  // let removeFromBasket = async (item) => {
  //   // dispatch items to basket
  //   dispatch({
  //     type: "ADD_TO_BASKET",
  //     basket: `${item}`,
  //   });

  //   // alert from  sweetalert library
  //   swal({
  //     title: "Good job!",
  //     text: "Product added to cart!",
  //     icon: "success",
  //     button: "Okay",
  //   });
  // };
  return (
    <React.Fragment>
      {/* if basket length is equal to 0 then show cart is empty, if It is greater than 0 show all the products in cart */}
      {basket?.length === 0 ? (
        <div className="checkout_empty">
          <h3>Your cart is empty!</h3>

          <p>Browse our categories and discover our best deals!</p>

          <Link to={"/"} className="checkout_emptyBtn">
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div className="checkout">
          <div className="checkout_left">
            <div className="checkout_num">
              <h4>
                {/* show the number of products in the cart */}
                Cart <span>({basket?.length})</span>
              </h4>
            </div>
            {/* map and show all the products added to cart */}
            {basket?.map((item) => {
              console.log(item);
              return (
                <React.Fragment>
                  <div key={item?.id} className="checkout_items">
                    <div className="checkout_products">
                      <div className="checkout_product">
                        <div className="checkout_productLeft">
                          <img
                            src={item?.image}
                            alt={item?.name || item?.title}
                          />

                          <button
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_FROM_BASKET",
                                id: item?.id,
                              })
                            }
                            className="product_btn"
                          >
                            <Delete /> Remove
                          </button>
                        </div>

                        <div className="checkout_productRigt">
                          <p className="checkout_title">
                            <Link to={`/product/${item?.id}`}>
                              {item?.name || item?.title}
                            </Link>
                          </p>
                          <p className="checkout_category">
                            Category: <span>{item?.category}</span>{" "}
                          </p>
                          <div className="product_rating">
                            <div className="product_star">
                              <Star />
                              <Star />
                              <Star />
                              <Star />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkout_productCount">
                      <p className="checkout_price">
                        $ <span>{item?.quantity * item?.price}</span>
                      </p>

                      <div className="checkout_counter">
                        <RemoveIcon
                          // onclick function to decrease product
                          onClick={() => {
                            if (item.quantity > 1) {
                              // if item quantity is greter than 1, dispatch item
                              dispatch({
                                type: "DECREASE_QUANTITY",
                                basket: item,
                              });
                            } else {
                              // if item is less than 1 remove from item
                              dispatch({
                                type: "REMOVE_FROM_BASKET",
                                id: item?.id,
                              });
                            }
                          }}
                          className="checkout_icon"
                        />
                        <p>{item?.quantity}</p>
                        <AddIcon
                          // onclick function to increase product
                          onClick={() =>
                            dispatch({
                              type: "INCREASE_QUANTITY",
                              basket: item,
                            })
                          }
                          className="checkout_icon"
                        />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div className="checkout_subTotal">
            <SubTotal />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Checkout;
