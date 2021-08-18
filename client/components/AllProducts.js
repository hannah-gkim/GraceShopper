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
      <section className="featured section">
        <h2 className="section-title">VIEW ALL</h2>

        <div className="featured__container bd-grid allProduct__container">
          {products
            ? products.map((product) => {
                return (
                  <div className="allProduct__product" key={product.id}>
                    <div className="allProduct__box">
                      <Link to={`/products/${product.id}`}>
                        <img
                          className="allProduct__img"
                          src={product.imageUrl}
                          alt={product.name}
                        />
                      </Link>
                    </div>

                    <div className="allProduct__data">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="featured__name">{product.name}</h3>

                        <span className="featured__preci">
                          {convert(product.price)}{" "}
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })
            : "no products"}
        </div>
      </section>
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
