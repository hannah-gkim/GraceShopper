import React from "react";
import { Link } from "react-router-dom";

export default function Offer() {
  return (
    <section className="offer section">
      <div className="offer__bg">
        <div className="offer__data">
          <h2 className="offer__title">Special Offer</h2>
          <p className="offer__description">
            Special offers discounts for first purchase
          </p>
          {/* <a href="#" className="button">
            SHOP NOW
          </a> */}
          <Link to="/products" className="button">SHOP NOW</Link>
        </div>
      </div>
    </section>
  );
}

