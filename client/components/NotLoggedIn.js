import React from "react";
import { LogIn } from "react-feather";
import { Link } from "react-router-dom";

export default function NotLoggedIn() {
  return (
    <section className="addedToCart section">
      <div className="guest-cart-inner">
        <Link to="/login">
          <img className="cat-img" src="/img/cat.jpg" />
          <br />

          <div className="back-to-shopping">
            <LogIn /> Please Log in to Shop! :D
          </div>
        </Link>
      </div>
    </section>
  );
}
