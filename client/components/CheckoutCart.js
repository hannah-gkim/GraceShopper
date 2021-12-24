import React, { Component, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../store/GlobalState";
import { getCart, removeItem, updateCartItem } from "../store/cart";
import { getProducts } from "../store/allProducts";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2 } from "react-feather";

let finalTotal = 0;
export default function CheckoutCart() {
  /*
    this.state = {
      id: "",
      items: [],
      products: [],
    };
  */
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const { auth, me, getCart, cart } = useContext(GlobalContext);

  useEffect(() => {
    me();
  }, []);

  useEffect(() => {
    getCart(auth.id, !!auth.id);
  }, [auth.id]);

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     this.setState(this.props);
  //   }
  // }

  // async handleCheckout() {
  //   if (this.props.isLoggedIn) {
  //     const id = this.state.userId;
  //     const token = window.localStorage.getItem("token");

  //     await axios.put(
  //       `/api/users/${id}/confirmation`,
  //       { total: finalTotal },

  //       {
  //         headers: {
  //           authorization: token,
  //         },
  //       }
  //     );
  //   } else {
  //     //TODO: if not logged in go to login page?
  //     window.localStorage.setItem("cart", JSON.stringify([]));
  //   }
  // }

  // // handleAdd(productId, currQty, product) {
  // //   this.propsdQuantity(productId, 1, product);
  // // }

  // // handleSubtract(productId, currQty, product) {
  // //   this.props.updatedQuantity(productId, -1, product);
  // // }

  // handleQuantityUpdate(event) {
  //   event.preventDefault();
  //   let orderId;
  //   let productId;
  //   let currentPrice;
  //   let quantity;

  //   let newItems = this.state.items.map((item) => {
  //     orderId = item.orderId;
  //     productId = item.productId;
  //     if (item.productId == event.target.name) {
  //       item.quantity = Number(event.target.value);
  //       let productDisplay = this.findProduct(item.productId);
  //       let price = productDisplay.price * item.quantity;
  //       item.currentPrice = price;
  //       currentPrice = price;
  //       quantity = Number(event.target.value);
  //       return item;
  //     }
  //     return item;
  //   });

  //   //console.log("newitem-->", this.state.items);
  //   this.setState({ ...this.state, items: newItems });

  //   this.handleUpdate(
  //     this.props.userId,
  //     currentPrice,
  //     quantity,
  //     orderId,
  //     productId
  //   );
  // }

  // //************************** */
  // handleUpdate(id, currentPrice, quantity, orderId, productId) {
  //   if (this.props.isLoggedIn) {
  //     this.state.items.map((item) => {
  //       this.props.updatedQuantity(
  //         id,
  //         currentPrice,
  //         quantity,
  //         orderId,
  //         productId
  //       );
  //     });
  //     // let cart = JSON.parse(window.localStorage.getItem("cart"));
  //     // console.log("what is cart-->", cart);
  //   }
  // }

  // handleDelete(id, orderId, productId) {
  //   //Deletes an item from the cart
  //   if (this.props.isLoggedIn) {
  //     this.props.deleteItem(id, orderId, productId);
  //     //generate new array to store into state
  //     const updatedItemsList = this.state.items.filter((item) => {
  //       if (item.productId !== productId) {
  //         return item;
  //       }
  //     });

  //     const updatedProductsList = this.state.products.filter((product) => {
  //       if (product.id !== productId) {
  //         return product;
  //       }
  //     });

  //     //set state
  //     this.setState({
  //       ...this.state,
  //       items: updatedItemsList,
  //       products: updatedProductsList,
  //     });

  //     let cart = JSON.parse(window.localStorage.getItem("cart"));
  //     //console.log("what is cart-->", cart);
  //   } else {
  //     // let cart = JSON.parse(window.localStorage.getItem("cart")).filter(
  //     //   (item) => {
  //     //     if (item.productId !== productId) return item;
  //     //   }
  //     // );
  //     // window.localStorage.setItem("cart", JSON.stringify(cart));
  //     // console.log(this.state.items);
  //     // console.log(cart);
  //     // this.setState({ items: cart });
  //   }
  // }

  // findProduct(productId) {
  //   if (this.props.isLoggedIn) {
  //     return this.state.products.filter(
  //       (item) => item.id == parseInt(productId)
  //     )[0];
  //   } else {
  //     return this.props.products.filter((item) => {
  //       return item.id == parseInt(productId);
  //     })[0];
  //   }
  // }

  // let { items } = this.state;
  // const { findProduct } = this;
  // let total = 0;

  // finalTotal = total;
  // let subtotal = {};
  const loadedCart = cart || {};
  console.log(loadedCart.products);

  return (
    <div>
      {loadedCart.products
        ? loadedCart.products.map((product) => {
            return (
              <div key={product.id}>
                {console.log(product.name)}
                <h1>{product.name}</h1>
                <img
                  className="product__img"
                  src={product.imageUrl}
                  alt={product.name}
                />
              </div>
            );
          })
        : ""}
    </div>
    // <section className="checkout section">
    //   <h2 className="section-title">Shopping Bag</h2>
    //   {items.length == 0 ? (
    //     ""
    //   ) : (
    //     <div className="back-to-shopping">
    //       <Link to="/products">
    //         <ShoppingBag /> Back to Shopping
    //       </Link>
    //     </div>
    //   )}
    //   <br />
    //   <div className="checkout__container bd-grid">
    //     {items.lenght !== 0 &&
    //       items.map((item) => {
    //         // console.log("item!!!-->", item);
    //         let productDisplay = findProduct(item.productId);
    //         let price = productDisplay.price * item.quantity;

    //         subtotal[productDisplay.id] = Number(
    //           productDisplay.price * item.quantity
    //         );
    //         total += Number(productDisplay.price * item.quantity);

    //         return (
    //           <div className="checkout__product" key={item.productId}>
    //             <div className="checkout__box">
    //               <Link to={`/products/${item.productId}`}>
    //                 <img
    //                   className="product__img"
    //                   src={productDisplay.imageUrl}
    //                   alt={productDisplay.name}
    //                 />
    //               </Link>
    //             </div>

    //             {/* input and delete */}
    //             <div className="addOrDel__data">
    //               <h3 className="checkout__name">{productDisplay.name}</h3>
    //               <span className="featured__preci">${price.toFixed(2)}</span>
    //               <form>
    //                 <input
    //                   type="number"
    //                   name={item.productId}
    //                   value={
    //                     item.quantity === 0
    //                       ? this.handleDelete(
    //                           this.props.userId,
    //                           item.orderId,
    //                           item.productId
    //                         )
    //                       : item.quantity
    //                   }
    //                   onChange={this.handleQuantityUpdate}
    //                 />
    //               </form>

    //               <Trash2
    //                 className="delete-item"
    //                 onClick={() =>
    //                   this.handleDelete(
    //                     this.props.userId,
    //                     item.orderId,
    //                     item.productId
    //                   )
    //                 }
    //               />
    //             </div>
    //           </div>
    //         );
    //       })}

    //     {items && items.length > 0 ? (
    //       <div className="checkout__chekcout">
    //         <div className="total__container">
    //           {/* <h2>Total: ${items && Math.round(total + Number.EPSILON)}</h2> */}
    //           <h2>Total: ${items && total.toFixed(2)}</h2>
    //         </div>
    //         <br />

    //         <div className="checkoutButton__container">
    //           <Link
    //             to="/confirmation"
    //             className="button"
    //             onClick={this.handleCheckout}
    //           >
    //             CHECKOUT
    //           </Link>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="addedToCart section">
    //         <div className="back-to-shopping">
    //           <Link to="/products">
    //             <br />
    //             Oh no! Your cart is empty!
    //             <br />
    //             <br />
    //             <ShoppingBag /> Back to Shopping
    //             <br />
    //           </Link>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </section>
  );
}

// const mapDispatch = (dispatch) => {
//   return {
//     loadCart: (id, isLoggedIn) => dispatch(getCart(id, isLoggedIn)),

//     updatedQuantity: (id, currentPrice, quantity, orderId, productId) =>
//       dispatch(updateCartItem(id, currentPrice, quantity, orderId, productId)),

//     loadAllProducts: (productId, quantity, product) => dispatch(getProducts()),
//     deleteItem: (id, orderId, productId) =>
//       dispatch(removeItem(id, orderId, productId)),
//   };
// };

// const mapState = (state) => {
//   return {
//     userId: state.auth.id,
//     isLoggedIn: !!state.auth.id,
//     items: state.cart.items,
//     products: state.cart.products,
//   };
// };

// export default connect(mapState, mapDispatch)(CheckoutCart);
