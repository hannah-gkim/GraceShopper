import React, { Component } from "react";
import { getCart, removeItem } from "../store/cart";
import { getProducts } from "../store/allProducts";
import { connect } from "react-redux";

class CheckoutCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], id: "", products: [] };
    this.findProduct = this.findProduct.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // this.props.loadCart(this.props.match.params.id);
    // this.props.loadCart(this.props.userId);
    console.log("in componenentDidMount");
    this.props.loadAllProducts();
  }

  componentDidUpdate(prevProps) {
    console.log("in componenentDidUpdate");
    if (prevProps !== this.props) {
      this.setState(this.props);
    }
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
    console.log("checking to see loggedin", this.props.isLoggedIn);
    // const { items, products } = this.state;
    const { products } = this.props;
    const { findProduct } = this;
    console.log("products-->", products);
    // console.log("items---->", items);
    const items = [];
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
                          <select value="" onChange="">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                          </select>
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
              <button>CONTINUE TO CHECKOUT</button>
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
              <h3>Total $100</h3>
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
  return {
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
    items: state.cart.items,
    products: state.cart.products,
  };
};

export default connect(mapState, mapDispatch)(CheckoutCart);
