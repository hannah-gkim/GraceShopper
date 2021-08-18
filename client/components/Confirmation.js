import React, { Component } from "react";

class Confirmation extends Component {
  render() {
    return (
      <section className="addedToCart section">
        <h2 className="section-title">Thank you for your order!</h2>

        <h3 style={{ textAlign: "center" }}>Your Order: c00133949494</h3>

        <h3
          style={{
            textAlign: "center",
            backgroundColor: "#ffa2b9",
            color: "white",
            padding: "1rem",
            width: "100",
          }}
        >
          View Order
        </h3>
      </section>
    );
  }
}

export default Confirmation;
