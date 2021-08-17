import React from "react";

export default function Collection() {
  return (
    <section className="collection section">
      <div className="collection__container bd-grid">
        <div className="collection__box">
          <img src="/img/backpackMan.png" alt="" className="collection__img" />

          <div className="collection__data">
            <h2 className="collection__title">
              <span className="collection__subtitle">Men</span>
              <br />
              Backpack
            </h2>
            <a href={`/products/1`} className="collection__view">
              View collection
            </a>
          </div>
        </div>

        <div className="collection__box">
          <div className="collection__data">
            <h2 className="collection__title">
              <span className="collection__subtitle">Women</span>
              <br />
              Backpack
            </h2>
            <a href={`/products/1`} className="collection__view">
              View collection
            </a>
          </div>
          <img
            src="/img/backpackWoman.png"
            alt=""
            className="collection__img"
          />
        </div>
      </div>
    </section>
  );
}
