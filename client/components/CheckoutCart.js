import React, { Component } from "react";
import { getCart, removeItem } from "../store/cart";
import { getProducts } from "../store/allProducts";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

class CheckoutCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            id: "",
            products: [],
            total: 0,
        };
        this.findProduct = this.findProduct.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.calculateTaxes = this.calculateTaxes.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
        this.handleTotal = this.handleTotal.bind(this);
    }

    componentDidMount() {
        this.props.loadCart(this.props.userId, this.props.isLoggedIn);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState(this.props);
        }
    }

    async handleCheckout() {
        if (this.props.isLoggedIn) {
            const id = this.state.userId;
            const token = window.localStorage.getItem("token");
            await axios.put(
                `/api/users/${id}/confirmation`,
                { total: this.state.total },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
        } else {
            window.localStorage.setItem("cart", JSON.stringify([]));
        }
    }

    handleDelete(id, orderId, productId) {
        //Deletes an item from the cart
        if (this.props.isLoggedIn) {
            this.props.deleteItem(id, orderId, productId);
            //generate new array to store into state
            const updatedItemsList = this.state.items.filter((item) => {
                if (item.productId !== productId) {
                    return item;
                }
            });
            const updatedProductsList = this.state.products.filter(
                (product) => {
                    if (product.id !== productId) {
                        return product;
                    }
                }
            );

            //set state
            this.setState({
                ...this.state,
                items: updatedItemsList,
                products: updatedProductsList,
            });
        } else {
            let cart = JSON.parse(window.localStorage.getItem("cart")).filter(
                (item) => {
                    if (item.productId !== productId) return item;
                }
            );
            window.localStorage.setItem("cart", JSON.stringify(cart));
            console.log(this.state.items);
            console.log(cart);
            this.setState({ items: cart });
        }
    }
    handleTotal(prevTotal) {
        let total = 0;
        if (this.props.isLoggedIn) {
            if (this.state.items) {
                total = this.state.items.reduce((total, value) => {
                    return value.currentPrice * value.quantity + total;
                }, 0);
            }
        } else {
            if (this.state.items)
                total = this.state.items.reduce((total, value) => {
                    return value.price * value.quantity + total;
                }, 0);
        }

        return total / 100;
    }

    handleQuantityUpdate(event) {
        event.preventDefault();

        let newItems = this.state.items.map((item) => {
            if (item.productId == event.target.name) {
                item.quantity = Number(event.target.value);
                return item;
            }
            return item;
        });
        this.setState({ items: newItems });
        this.handleTotal(this.state.total);
    }

    findProduct(productId) {
        if (this.props.isLoggedIn) {
            return this.state.products.filter(
                (item) => item.id == parseInt(productId)
            )[0];
        } else {
            return this.props.products.filter((item) => {
                return item.id == parseInt(productId);
            })[0];
        }
    }
    calculateTaxes(subtotal) {
        let displayTotal = (subtotal * 0.04) / 100;

        return displayTotal;
    }
    render() {
        let { items, products, total } = this.state;
        const { findProduct, handleTotal, calculateTaxes } = this;

        var formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
        // formatter.format(subtotal)
        let subtotal = handleTotal(total);
        let formattedSubtotal = formatter.format(subtotal);
        let taxes = calculateTaxes(subtotal);
        let formattedTaxes = formatter.format(taxes);
        let formattedTotal = formatter.format(subtotal + taxes);

        let isShippingFree = false;

        if (subtotal > 100) {
            isShippingFree = true;
        }
        console.log(isShippingFree);

        // let displaySubTotal = formatter.format();
        console.log(subtotal);
        if (!this.props.isLoggedIn) {
            // items = this.props.items || [];
            products = this.props.products || [];
        }
        return (
            <div>
                <div className="checkout-div">
                    <div className="checkout-items-box">
                        <h1 className="title">Shopping items</h1>
                        <hr />

                        {items.length
                            ? items.map((item) => {
                                  let disProduct = findProduct(item.productId);
                                  let price =
                                      (disProduct.price * item.quantity) / 100;
                                  var formatter = new Intl.NumberFormat(
                                      "en-US",
                                      {
                                          style: "currency",
                                          currency: "USD",
                                      }
                                  );

                                  price =
                                      formatter.format(price); /* $2,500.00 */
                                  return (
                                      <div key={item.productId}>
                                          <div className="singeitem-div">
                                              <img src={disProduct.imageUrl} />
                                              <div className="detail">
                                                  <h2>{disProduct.name}</h2>
                                                  <h2>{`${price}`}</h2>
                                              </div>
                                              <div className="addorremove">
                                                  <div className="qty">
                                                      <label htmlFor="quantity">
                                                          {" "}
                                                          quantity
                                                      </label>
                                                      <input
                                                          type="number"
                                                          name={item.productId}
                                                          value={item.quantity}
                                                          onChange={
                                                              this
                                                                  .handleQuantityUpdate
                                                          }
                                                      />
                                                  </div>

                                                  <button
                                                      onClick={() => {
                                                          this.handleDelete(
                                                              this.props.userId,
                                                              item.orderId,
                                                              item.productId
                                                          );
                                                      }}
                                                  >
                                                      delete
                                                  </button>
                                              </div>
                                          </div>
                                          <br />
                                      </div>
                                  );
                              })
                            : "no item in cart"}
                        <hr />
                    </div>
                    <div className="checkout-box">
                        <h1 className="title">Summary</h1>
                        <hr />
                        <div className="total">
                            <h3>SUBTOTAL: {formattedSubtotal}</h3>
                            <h3>
                                SHIPPING: {!isShippingFree ? `$20` : "FREE"}
                            </h3>
                            <h3>TAXES (4%): {formattedTaxes}</h3>
                            <hr />
                            <h3>Total: {formattedTotal}</h3>
                            <div className="checkout">
                                <Link to="/confirmation">
                                    <button onClick={this.handleCheckout}>
                                        CONTINUE TO CHECKOUT
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadCart: (id, isLoggedIn) => dispatch(getCart(id, isLoggedIn)),
        loadAllProducts: () => dispatch(getProducts()),
        deleteItem: (id, orderId, productId) =>
            dispatch(removeItem(id, orderId, productId)),
    };
};

const mapState = (state) => {
    return {
        userId: state.auth.id,
        isLoggedIn: !!state.auth.id,
        items: state.cart.items,
        products: state.cart.products,
    };
};

export default connect(mapState, mapDispatch)(CheckoutCart);
