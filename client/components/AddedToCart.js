import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class AddedToCart extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          marginTop: "250px",
          marginLeft: "200px",
          marginRight: "200px",
          padding: "70px",
          background: "black",
          color: "white",
          border: "3px solid grey",
          justifyContent: "center",
          fontSize: "40px",
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
    );
  }
}

export default AddedToCart;
