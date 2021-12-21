import React, { useContext, useEffect } from "react";
import { GlobalContext, allProducts } from "../store/GlobalState";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const { products, allProducts } = useContext(GlobalContext);

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <section className="allProduct section">
      {console.log("getTransactions--->", products)}
      <h2 className="section-title">VIEW ALL</h2>
      <div className="featured__container bd-grid allProduct__container">
        {products
          ? products.map((product) => {
              return (
                <div className="allProduct__product" key={product.id}>
                  <div className="allProduct__box">
                    <Link to={`/products/${product.id}`}>
                      <img
                        className="allProduct__img"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                    </Link>
                  </div>
                  {/*************** name + price *******************/}
                  <div className="allProduct__data">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="featured__name">{product.name}</h3>
                      <span className="featured__preci">${product.price}</span>
                    </Link>
                  </div>
                </div>
              );
            })
          : "no products"}
      </div>
    </section>
  );
}
