import React, { Component } from "react";

/*

 change quantity dropdown menu
 checkout box that contains total price, checkout button
*/

class CheckoutCart extends Component {
  render() {
    return (
      <div>
        {/* need to be able to see all items, so map it! */}
        <h1>Shopping bag</h1>
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
    );
  }
}

export default CheckoutCart;
