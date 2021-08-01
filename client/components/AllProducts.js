import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

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

    const convert = (pric) => {
      let price = (pric /= 100);
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      price = formatter.format(price);
      return price;
    };

    return (
      <div className="grid-box">
        <div className="each-grid">
          {products
            ? products.map((product) => {
                return (
                  <div className="grid-wrap" key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <img
                        className="all-product-img"
                        src={product.imageUrl}
                        alt={product.name}
                        // width="230"
                        // height="230"
                      />
                    </Link>
                    <Link to={`/products/${product.id}`}>
                      <div className="grid-text-container">
                        <p className="text"> {product.name}</p>
                        <p className="text">{convert(product.price)} </p>
                      </div>
                    </Link>
                  </div>
                );
              })
            : "no products"}
        </div>
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
