import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "react-feather";
class AddedToCart extends Component {
  render() {
    return (
      <div className="addedToCart-main-div">
        <div className="added-to-cart-wrap">
          <div className="added-to-cart">
            <div>Added to Cart</div>
          </div>
        </div>

        <div className="cart-button">
          <Link to="/viewCart">
            <div>
              <button
                style={{
                  fontSize: "30px",
                }}
              >
                Cart
              </button>
            </div>
          </Link>
        </div>

        <div className="cart-button">
          <div className="back-to-shopping">
            <Link to="/products">
              <ShoppingBag /> Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AddedToCart;
