import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { getNewCartItem } from "../store/cartitem";

class SingleProduct extends Component {
  constructor() {
      super();
  }
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.id);
  }
  // componentWillUnmount() {
  //     this.props.student.id = undefined;
  // }
  render() {
    const product = this.props.singleProduct || {};
    const quantity = this.props.singleProduct.quantity;
    // does cartitem need product id only or more?
    const cartitem = this.props.match.params.id

    return (
      <div>
        <h1>Single Product Page</h1>
        <img src={product.imageUrl} />
        <h3>name: {product.name}</h3>
        <h3>price: {`$ ${product.price}`}</h3>
        <h3>description: {product.description}</h3>

        <select value="" onChange="">
          <option value="">Qty:1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
        </select>
        <button type="button" onClick={()=> this.props.createCartItem(userId, cartitem)}>add to cart</button>
      </div>
    );
  }
}

const mapState = ({ singleProduct }) => {
  return { singleProduct };
};

const mapDispatch = (dispatch) => {
  return {
    loadProduct: (id) => {
      dispatch(fetchSingleProduct(id));
    },
    createCartItem: (userId, cartitem) => {dispatch(getNewCartItem(userId, cartitem))}
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
