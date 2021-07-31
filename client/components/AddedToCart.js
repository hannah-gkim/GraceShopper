import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  CartContainer,

  LargeText,
 
} from "../style";
import { ShoppingBag, Trash2 } from "react-feather";
class AddedToCart extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            marginTop: "150px",
            marginLeft: "200px",
            marginRight: "200px",
            padding: "70px",
            background: "black",
            color: "white",
            border: "3px solid grey",
            justifyContent: "center",
            fontSize: "35px",
          }}
        >
          <div>Added to Cart</div>
          <Link to="/viewCart">
            <div
              style={{
                marginLeft: "50px",
              }}
            >
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
        <CartContainer>
          <LargeText>
            <Link to="/products">
              <ShoppingBag /> Back to Shopping
            </Link>
          </LargeText>
        </CartContainer>
      </div>
    );
  }
}

export default AddedToCart;
