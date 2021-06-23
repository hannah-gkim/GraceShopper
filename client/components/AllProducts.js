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
    return (
      <ul>
        <div className="products-container">
          {products
            ? products.map((product) => {
                return (
                  <div key={product.id} className="product">
                    <Link to={`/products/${product.id}`}>
                      <li> {product.name}</li>

                      <img
                        src={product.imageUrl}
                        alt={product.id}
                        width="400"
                        height="auto"
                      />
                    </Link>
                    <h4>{product.description} </h4>
                    <h4>${product.price} </h4>
                  </div>
                );
              })
            : "no products"}
        </div>
      </ul>
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
