import React from "react";
import "../Checkout/Payment.css";
import { Star } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SubTotal from "./SubTotal";
import { useStateValue } from "../../StateProvider/StateProvider";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  console.log(basket);

  return (
    <React.Fragment>
      <div className="payment">
        <div className="payment_left">
          <div className="payment_num">
            <p>
              {/* show the number of products in the cart */}
              Checkout (
              <Link to={"/cart/checkout"}>
                <span>{basket?.length} items</span>
              </Link>
              )
            </p>
          </div>

          <div className="payment_delivery">
            <h3>Delivery Address</h3>

            <div className="payment_details">
              <p className="payment_name">Temitope Andrews</p>
              <p className="payment_address">
                123, Airport Road, Lagos Nigeria
              </p>
            </div>
          </div>
          {/* map and show all the products added to cart */}
          <div className="payment_checkout">
            <p className="payment_checkoutName">Checkout Items And Delivery</p>

            <div className="payment_checkoutProduct">
              {basket?.map((item) => {
                console.log(item);
                return (
                  <React.Fragment>
                    <div key={item?.id} className="payment_items">
                      <div className="payment_products">
                        <div className="payment_product">
                          <div className="payment_productLeft">
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

                          <div className="payment_productRigt">
                            <p className="payment_title">
                              <Link to={`/product/${item?.id}`}>
                                {item?.name || item?.title}
                              </Link>
                            </p>
                            <p className="payment_category">
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

                      {/* <div className="payment_productCount">
                    <p className="payment_price">
                      $ <span>{item?.quantity * item?.price}</span>
                    </p>

                    <div className="payment_counter">
                      <RemoveIcon
                        // onclick function to decrease product
                        onClick={() =>
                          dispatch({ type: "DECREASE_PRODUCT", basket: item })
                        }
                        className="payment_icon"
                      />
                      <p>{item.quantity}</p>
                      <AddIcon
                        // onclick function to increase product
                        onClick={() =>
                          dispatch({ type: "INCREASE_PRODUCT", basket: item })
                        }
                        className="payment_icon"
                      />
                    </div>
                  </div> */}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <hr />
          <div className="payment_method">
            <h3>Payment Method</h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;
