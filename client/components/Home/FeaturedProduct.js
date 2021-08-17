import React from "react";
import { Link } from "react-router-dom";

export default function FeaturedProduct() {
  return (
    <section className="featured section">
      <h2 className="section-title">FEATURED PRODUCTS</h2>
      <Link to="/products" className="section-all">
        View All
      </Link>

      <div className="featured__container bd-grid">
        {/* product 1 */}
        <div className="featured__product">
          <div className="featured__box">
            <div className="featured__new">NEW</div>
            <img src="/img/feature1.png" alt="" className="featured__img" />
          </div>
          <div className="featured__data">
            <h3 className="featured__name">Headphone OneBlack</h3>
            <span className="featured__preci">$29</span>
          </div>
        </div>
        {/* product2 */}
        <div className="featured__product">
          <div className="featured__box">
            <div className="featured__new">NEW</div>
            <img src="/img/feature2.png" alt="" className="featured__img" />
          </div>
          <div className="featured__data">
            <h3 className="featured__name">Speaker Beats Pill</h3>
            <span className="featured__preci">$199</span>
          </div>
        </div>
        {/* product3 */}
        <div className="featured__product">
          <div className="featured__box">
            <div className="featured__new">NEW</div>
            <img src="/img/feature3.png" alt="" className="featured__img" />
          </div>
          <div className="featured__data">
            <h3 className="featured__name">Apple Air Pod</h3>
            <span className="featured__preci">$122</span>
          </div>
        </div>
        {/* product 4 */}
        <div className="featured__product">
          <div className="featured__box">
            <div className="featured__new">NEW</div>
            <img src="/img/feature4.png" alt="" className="featured__img" />
          </div>
          <div className="featured__data">
            <h3 className="featured__name">SmartWatch F9 Black</h3>
            <span className="featured__preci">$99</span>
          </div>
        </div>
        {/* product 5 */}
      </div>
    </section>
  );
}
