import React, { Component } from "react";

class CheckoutCart extends Component {
  render() {
    return (
      <div>
        {/* need to be able to see all items, so map it! */}
        <h1>Shopping bag</h1>
        <div className="checkout-items">
          <h2>image</h2>
          <h2>name</h2>
          <h2>price</h2>
          <button>delete</button>
          <select value="" onChange="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
        </div>
        <div className="checkout-box">
          <h3>total $...</h3>
          <button>CONTINUE TO CHECKOUT</button>
        </div>
      </div>
    );
  }
}

export default CheckoutCart;
