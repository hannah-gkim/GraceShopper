import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../store/GlobalState";
import { Link, useParams } from "react-router-dom";
import { ShoppingBag } from "react-feather";

export default function SingleProduct() {
  const [quantity, setQuantity] = useState(1);
  const { getNewCartItem, auth, singleProduct, getSingleProduct, me } =
    useContext(GlobalContext);
  const { id } = useParams();

  useEffect(() => {
    me();
  }, []);

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  function handleChange(event) {
    event.preventDefault();
    const quantity = event.target.value || 1;
    setQuantity(quantity);
  }

  function handleAddToCart() {
    if (!!auth.id) {
      const cartitem = {
        productId: id, //productID
        quantity: quantity,
      };
      const userId = auth.id;
      // console.log("userId:", userId, "cartItem:", cartitem);
      getNewCartItem(userId, cartitem);
    } else {
      return <h2>Please Login to Shop</h2>;
    }
  }

  const product = singleProduct || {};
  let price = product.price;
  return (
    <section className="single section">
      <div className="back-to-shopping">
        <Link to="/products">
          <ShoppingBag /> Back to Shopping
        </Link>
      </div>
      <br />

      <div className="singleProduct__container">
        <div className="product-img">
          <img src={product.imageUrl} className="single-image" />
        </div>

        <div className="singleProduct__description">
          <h3>name: {product.name}</h3>
          <h3>price: ${`${price}`}</h3>
          <h3>description: {product.description}</h3>
          <select id="quantity" onChange={handleChange}>
            <option value="1">Qty:1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <br />
          <Link to="/addedToCart" className="button" onClick={handleAddToCart}>
            add to cart
          </Link>
        </div>
      </div>
    </section>
  );
}
