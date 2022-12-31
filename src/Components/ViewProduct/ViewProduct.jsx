import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../ViewProduct/ViewProduct.css";
import { FavoriteBorder, InsertEmoticon } from "@mui/icons-material";
import { Star } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import ProductServie from "../../Services/axiosService";
import { useStateValue } from "../../StateProvider/StateProvider";

const ViewProduct = () => {
  // useParams to get the product id
  const { ProductId } = useParams();

  // the initial single product should be an empty object
  const [item, setItem] = useState({});

  // global state provider
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        // get or fetch product from the server
        const response = await ProductServie.Product(ProductId);
        // se the product to the response
        setItem(response.data);
      } catch (error) {
        // if error catch and show
        setItem(error);
      }
    };

    // call the fuction
    getSingleProduct();
  }, [ProductId]);

  item.quantity = 1;

  return (
    <div key={item.id} className="singleProduct">
      <div className="singleProduct_images">
        <span className="product_promo2">-20%</span>
        <img
          className="singleProduct_imageLarge"
          src={item?.image}
          alt={item?.title}
        />
        <div className="singleProduct_imageflex">
          <img src={item?.image} alt={item?.title} />

          <img src={item?.image} alt={item?.title} />
        </div>
      </div>

      <div className="singleProduct_item">
        <div className="singleProduct_info">
          <p>{item?.title}</p>

          <div className="singleProduct_content">
            <div className="singleProduct_flex">
              <h4>Brand:</h4>
              <p>Unvailable</p>
            </div>

            <div className="singleProduct_flex">
              <h4>Category:</h4>
              <p>
                <span>{item?.category}</span>{" "}
              </p>
            </div>

            <div className="singleProduct_flex">
              <h4>SKU:</h4>
              <p>SGA04</p>
            </div>

            <div className="singleProduct_rating">
              {/** round up the Product rating to the nearest whole number */}

              {/* {Array(Math.round(Product?.rating?.rate))
                .fill()
                .map((_) => { 
                  return (
                    <p className="product_star">
                      <Star />
                    </p>
                  );
                })} */}
            </div>

            <p className="singleProduct_price">
              $ <span>{item?.price}</span>
            </p>

            <hr />

            <div className="singleProduct_desc">
              <h4>Description</h4>

              <p>{item?.description}</p>
            </div>

            <div className="singleProduct_action">
              <div className="singleProduct_form">
                <RemoveIcon
                  onClick={() =>
                    dispatch({
                      type: "DECREASE_QUANTITY",
                      basket: item,
                    })
                  }
                  className="singleProduct_Dec"
                />
                <span>{item.quantity}</span>
                <AddIcon
                  onClick={() =>
                    dispatch({
                      type: "INCREASE_QUANTITY",
                      basket: item,
                    })
                  }
                  className="singleProduct_Inc"
                />
              </div>
              <p className="product_cart">
                <ShoppingCart className="product_shopIcon" />{" "}
                <span
                  onClick={() =>
                    dispatch({ type: "ADD_TO_BASKET", basket: item })
                  }
                >
                  Add To Cart
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
