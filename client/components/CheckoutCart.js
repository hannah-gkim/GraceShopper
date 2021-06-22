import React, { Component } from "react";
import { getCart } from "../store/cart";
import { getProducts } from "../store/allProducts";
import { connect } from "react-redux";

class CheckoutCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], id: "", products: [] };
    this.findProduct = this.findProduct.bind(this);
  }

  componentDidMount() {
    // this.props.loadCart(this.props.match.params.id);
    this.props.loadCart(this.props.userId);
    this.props.loadAllProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(this.props);
    }
  }

  findProduct(productId) {
    const product = this.state.products.filter(
      (item) => item.id == productId
    )[0];
    console.log("hello", product);
    return product;
  }

  render() {
    const { items, products } = this.state;
    const { findProduct } = this;
    console.log("products-->", products);

    return (
      <div>
        {/* need to be able to see all items, so map it! */}

        <box className="checkout-div">
          <div className="checkout-items-box">
            <h1 className="title">Shopping items</h1>
            <hr />

            {items.length
              ? items.map((item) => {
                  console.log(item);

                  let disProduct = findProduct(item.productId);

                  return (
                    <div key={item.productId}>
                      <div className="singeitem-div">
                        <img src="https://blog.williams-sonoma.com/wp-content/uploads/2018/06/jun-23-Vanilla-Ombre-Layer-Cake.jpg" />
                        <div className="detail">
                          <h2>{disProduct.name}</h2>
                          <h2>{disProduct.price}</h2>
                        </div>
                        <div className="addorremove">
                          <select value="" onChange="">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                          </select>
                          <button>delete</button>
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
        </box>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadCart: (id) => dispatch(getCart(id)),
    loadAllProducts: () => dispatch(getProducts()),
  };
};

const mapState = (state) => {
  return {
    userId: state.auth.id,
    items: state.cart.items,
    products: state.cart.products,
  };
};

export default connect(mapState, mapDispatch)(CheckoutCart);
