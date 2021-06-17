import React, { Component } from "react";

class CheckoutCart extends Component {
  render() {
    return (
      <div>
        {/* need to be able to see all items, so map it! */}

        <box className="checkout-div">
          <div className="checkout-items-box">
            <h1 className="title">Shopping Cart</h1>

            <div className="singeitem-image">
              <img src="https://blog.williams-sonoma.com/wp-content/uploads/2018/06/jun-23-Vanilla-Ombre-Layer-Cake.jpg" />
              <div className="detail">
                <h2>name</h2>
                <h2>price</h2>
              </div>
            </div>

            <button>delete</button>
            <select value="" onChange="">
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
          </div>
          <div className="checkout-box">
            <h1 className="title">Summary</h1>
            <h3>total $...</h3>
            <button>CONTINUE TO CHECKOUT</button>
          </div>
        </box>
      </div>
    );
  }
}

export default CheckoutCart;
