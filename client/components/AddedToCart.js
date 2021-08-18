import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "react-feather";
class AddedToCart extends Component {
  render() {
    return (
      <section className="addedToCart section">
        <h2 className="section-title">Added to Cart</h2>

        <div className="back-to-shopping">
          <Link to="/viewCart" className="button">
            Cart
          </Link>
        </div>

        <div className="back-to-shopping">
          <Link to="/products">
            <ShoppingBag /> Back to Shopping
          </Link>
        </div>
      </section>
    );
  }
}

export default AddedToCart;
