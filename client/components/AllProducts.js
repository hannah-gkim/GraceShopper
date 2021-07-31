import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/allProducts";
import { Link } from "react-router-dom";
import {
  Grid,
  CartButton,
  Wrapper,
  Text,
  GridContainer,
  SmallText,
  CenterContainer,
  AdminButton,
} from "../style";

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
        <Grid>
          {products
            ? products.map((product) => {
                return (
                  <Wrapper key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width="230"
                        height="230"
                      />
                    </Link>
                    <Link to={`/products/${product.id}`}>
                      <GridContainer>
                        <Text> {product.name}</Text>
                        <Text>{convert(product.price)} </Text>
                      </GridContainer>
                    </Link>
                  </Wrapper>
                );
              })
            : "no products"}
        </Grid>
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
