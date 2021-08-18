import React from "react";
import { LogIn } from "react-feather";
import { Link } from "react-router-dom";

export default function NotLoggedIn() {
  return (
    <section className="addedToCart section">
      <div className="guest-cart-inner">
        <Link to="/login">
          <img
            className="cat-img"
            src="https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
          />
          <br />

          <div className="back-to-shopping">
            <LogIn /> Please Log in to Shop! :D
          </div>
        </Link>
      </div>
    </section>
  );
}
