import React, { Component } from "react";

class Confirmation extends Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "150px" }}>
          Thank you for your order!
        </h1>
        <div className="confirmation-div">
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              width: "70%",
            }}
          >
            <h1>YOUR ORDER WAS PLACED SUCCESSFULLY.</h1>
            <h3>Check your email for your order confirmation</h3>
          </div>
        </div>
        <h3 style={{ textAlign: "center" }}>Your Order: c00133949494</h3>
        <h3 style={{ textAlign: "center" }}>View Order</h3>
      </div>
    );
  }
}

export default Confirmation;
