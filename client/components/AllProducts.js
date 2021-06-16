import React from "react";
import { connect } from "react-redux";


class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  componentDidUpdate(prevProps) {
    //conditions
    if (prevProps !== this.props) {
      this.setState(this.props);
    }
  }
  render() {
    const { products } = this.state;

    return (
      <div>
        <ul>
          {products
            ? products.map((product) => {
                return <li> product.name</li>;
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
    getProducts: () => {
      getProducts();
    },
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
