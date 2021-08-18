import React from "react";
import { Link } from "react-router-dom";

export default function NewArrivals() {
  return (
    <section className="new section">
      <h2 className="section-title">NEW ARRIVALS</h2>
      <Link to="/products" className="section-all">
        View All
      </Link>

      <div className="new__container bd-grid">
        {/* new Arrival 1 */}
        <div className="new__box">
          <img src="/img/new1.png" alt="" className="new__img" />
          <div className="new__link">
            <Link to="/products/25" className="button">
              VIEW PRODUCT
            </Link>
          </div>
        </div>
        {/* new Arrival 2 */}
        <div className="new__box">
          <img src="/img/new2.png" alt="" className="new__img" />
          <div className="new__link">
            <Link to="/products/26" className="button">
              VIEW PRODUCT
            </Link>
          </div>
        </div>
        {/* new Arrival 3 */}
        <div className="new__box">
          <img src="/img/new3.png" alt="" className="new__img" />
          <div className="new__link">
            <Link to="/products/27" className="button">
              VIEW PRODUCT
            </Link>
          </div>
        </div>
        {/* new Arrival 4 */}
        <div className="new__box">
          <img src="/img/new4.png" alt="" className="new__img" />
          <div className="new__link">
            <Link to="/products/28" className="button">
              VIEW PRODUCT
            </Link>
          </div>
        </div>
        {/* new Arrival 5 */}
        <div className="new__box">
          <img src="/img/new5.png" alt="" className="new__img" />
          <div className="new__link">
            <Link to="/products/29" className="button">
              VIEW PRODUCT
            </Link>
          </div>
        </div>
        {/* new Arrival 6 */}
        <div className="new__box">
          <img src="/img/new6.png" alt="" className="new__img" />
          <div className="new__link">
            <Link to="/products/30" className="button">
              VIEW PRODUCT
            </Link>
          </div>
        </div>
        {/* new Arrival 7 */}
        {/* new Arrival 8 */}
        {/* new Arrival 9 */}
      </div>
    </section>
  );
}
