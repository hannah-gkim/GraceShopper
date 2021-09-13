import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { getNewCartItem } from "../store/addToCart";
import { Link } from "react-router-dom";
import { ShoppingBag } from "react-feather";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.id);
  }
  // componentWillUnmount() {
  //     this.props.student.id = undefined;
  // }
  handleChange(event) {
    event.preventDefault();
    console.log("this is quantity", event.target.value);
    const quantity = event.target.value || 1;
    this.setState({ quantity });
  }

  handleAddToCart() {
    if (this.props.isLoggedIn) {
      const cartitem = {
        productId: this.props.match.params.id, //productID
        quantity: this.state.quantity,
      };
      const userId = this.props.user.id;
      //req.params
      this.props.createCartItem(userId, cartitem);
    } else {
      return <h2>Please Login to Shopp</h2>;
      // const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      // console.log(cartData);
      // const index = cartData.findIndex(
      //   (item) => item.productId == this.props.match.params.id
      // );
      // if (index == -1) {
      //   const itemToAdd = {
      //     productId: this.props.match.params.id,
      //     name: this.props.singleProduct.name,
      //     price: this.props.singleProduct.price,
      //     quantity: this.state.quantity,
      //     imageUrl: this.props.singleProduct.imageUrl,
      //   };
      //   cartData.push(itemToAdd);
      // } else {
      //   cartData[index].quantity += parseInt(this.state.quantity);
      //   console.log("item exists");
      // }
      // window.localStorage.setItem("cart", JSON.stringify(cartData));
    }
  }
  render() {
    const product = this.props.singleProduct || {};
    // const quantity = this.props.singleProduct.quantity;
    // does cartitem need product id only or more?
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
          <select id="quantity" onChange={this.handleChange}>
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
          <Link
            to="/addedToCart"
            className="button"
            onClick={this.handleAddToCart}
          >
            add to cart
          </Link>
          </div>
        </div>
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProduct: (id) => {
      dispatch(fetchSingleProduct(id));
    },
    createCartItem: (userId, cartitem) => {
      dispatch(getNewCartItem(userId, cartitem));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
