import React from "react";

export default function NewsLetter() {
  return (
    <section className="newsletter section">
      <div className="newsletter__container bd-grid">
        <div className="newsletter__subscribe">
          <h2 className="section__title">OUR NEWSLETTER</h2>
          <p className="newsletter__description">
            Promotion new products and sales. Directly to your
          </p>

          <form action="" className="newsletter__form">
            <input
              type="text"
              className="newsletter__input"
              placeholder="Enter your email"
            />
            <a href="#" className="button">Subscribe</a>
          </form>
        </div>
      </div>
    </section>
  );
}
