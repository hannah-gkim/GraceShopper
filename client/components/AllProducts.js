import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/allProducts";

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { products: [] };
  }

  componentDidMount() {
    this.props.loadAllProducts();
  }

  // componentDidUpdate(prevProps) {
  //   //conditions
  //   if (prevProps !== this.props) {
  //     this.setState(this.props);
  //   }
  // }
  render() {
    console.log(this.props);
    const { products } = this.props;
    return (
      <div>
        <ul>
          {products
            ? products.map((product) => {
                return <li key={product.id}> {product.name}</li>;
              })
            : "no products"}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadAllProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
