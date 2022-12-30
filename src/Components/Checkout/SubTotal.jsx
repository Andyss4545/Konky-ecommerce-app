import React from "react";
import "../Checkout/SubTotal.css";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../StateProvider/reducer";
import { useStateValue } from "../../StateProvider/StateProvider";

const SubTotal = () => {
  const [{ basket }] = useStateValue();
  console.log("this is basket", getBasketTotal);
  return (
    <CurrencyFormat
      renderText={(value) => {
        return (
          <div className="subtotal">
            <p className="subtotal_title">CART SUMMARY</p>
            <div className="subtotal_row2">
              <p className="subtotal_colon">Subtotal:</p>
              <p className="subtotal_price">
                ({basket?.length}) items <span>{value}</span>
              </p>
            </div>

            <Link to={"/login"} className="subtotal_btn">
              CHECKOUT (
              <p>
                <span>{value}</span>
              </p>
              )
            </Link>
          </div>
        );
      }}
      decimalScale={2}
      // import getBasket from the reducer as a function and pass basket into it
      value={getBasketTotal(basket)}
      displayType={"text"}
      prefix={"$"}
      thousandSeparator={true}
    />
  );
};

export default SubTotal;
