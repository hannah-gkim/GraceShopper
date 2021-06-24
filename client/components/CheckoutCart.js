import React, { Component } from "react";
import { getCart, removeItem } from "../store/cart";
import { getProducts } from "../store/allProducts";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

class CheckoutCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], id: "", products: [], total: 0 };
    this.findProduct = this.findProduct.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    this.handleTotal = this.handleTotal.bind(this);
  }

  componentDidMount() {
    // this.props.loadCart(this.props.match.params.id);
    this.props.loadCart(this.props.userId);
    this.props.loadAllProducts();
  }

  componentDidUpdate(prevProps) {
    console.log("component did update");
    if (prevProps !== this.props) {
      this.setState(this.props);
    }
  }
  async handleCheckout() {
    console.log("these items-->", this.state.items);

    //fire checkout thunk??..
    const id = this.state.userId;
    // console.log("ist id there??-->", id);
    // console.log("this.props--->", this.props);

    const token = window.localStorage.getItem("token");
    console.log(token);
    //axios.put('endoint', req.body, {header: autorization})
    await axios.put(
      `/api/users/${id}/confirmation`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
  }

  handleTotal(prevTotal) {
    let total = this.state.items.reduce((total, value) => {
      return value.currentPrice * value.quantity + total;
    }, 0);

    total /= 100;

    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    total = formatter.format(total);

    if (total !== prevTotal) {
      console.log("prevState does not equal this.state");
      this.setState({ total });
    }
    return total;
  }

  handleQuantityUpdate(event) {
    event.preventDefault();
    const item = this.state.items.filter(
      (item) => item.productId == event.target.name
    )[0];
    console.log(item);

    let newItems = this.state.items.map((item) => {
      if (item.productId == event.target.name) {
        item.quantity = Number(event.target.value);
        return item;
      }
      return item;
    });

    console.log(newItems);
    this.setState({ items: newItems });

    console.log("calling this.handletotal");
    this.handleTotal(this.state.total);
  }
  handleDelete(id, orderId, productId) {
    //Deletes an item from the cart
    this.props.deleteItem(id, orderId, productId);
    //generate new array to store into state
    const updatedItemsList = this.state.items.filter((item) => {
      if (item.productId !== productId) {
        return item;
      }
    });
    const updatedProductsList = this.state.products.filter((product) => {
      if (product.id !== productId) {
        return product;
      }
    });

    //set state
    this.setState({
      ...this.state,
      items: updatedItemsList,
      products: updatedProductsList,
    });
  }

  findProduct(productId) {
    const product = this.state.products.filter(
      (item) => item.id == productId
    )[0];
    // console.log("hello", product);
    return product;
  }

  render() {
    console.log("component did render");
    const { items, products, total } = this.state;
    const { findProduct, handleTotal } = this;

    console.log("products-->", products);
    console.log("items-->", items);

    return (
      <div>
        {/* need to be able to see all items, so map it! */}

        <div className="checkout-div">
          <div className="checkout-items-box">
            <h1 className="title">Shopping items</h1>
            <hr />

            {items.length
              ? items.map((item) => {
                  let disProduct = findProduct(item.productId);
                  let price = (disProduct.price * item.quantity) / 100;
                  var formatter = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  });

                  price = formatter.format(price); /* $2,500.00 */
                  return (
                    <div key={item.productId}>
                      <div className="singeitem-div">
                        <img src={disProduct.imageUrl} />
                        <div className="detail">
                          <h2>{disProduct.name}</h2>
                          <h2>{`${price}`}</h2>
                        </div>
                        <div className="addorremove">
                          <div>
                            <label htmlFor="quantity"> quantity</label>
                            <input
                              type="number"
                              name={item.productId}
                              value={item.quantity}
                              onChange={this.handleQuantityUpdate}
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
            <div className="checkout">
              <Link to="/confirmation">
                <button onClick={this.handleCheckout}>
                  CONTINUE TO CHECKOUT
                </button>
              </Link>
            </div>
          </div>
          <div className="checkout-box">
            <h1 className="title">Summary</h1>
            <hr />
            <div className="total">
              <h3>SUBTOTAL $95</h3>
              <h3>SHIPPING FREE</h3>
              <h3>TAXES $10</h3>
              <hr />
              <h3>Total {handleTotal(total)}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadCart: (id) => dispatch(getCart(id)),
    loadAllProducts: () => dispatch(getProducts()),
    deleteItem: (id, orderId, productId) =>
      dispatch(removeItem(id, orderId, productId)),
  };
};

const mapState = (state) => {
  console.log("mapping state");
  return {
    userId: state.auth.id,
    items: state.cart.items,
    products: state.cart.products,
  };
};

export default connect(mapState, mapDispatch)(CheckoutCart);
