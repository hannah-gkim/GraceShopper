import React, { Component } from "react";
import { getCart, removeItem, updateCartItem } from "../store/cart";
import { getProducts } from "../store/allProducts";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingBag } from "react-feather";
import {
  CartContainer,
  List,
  LeftColumn,
  RightColumn,
  ButtonContainer,
  Button,
  LargeText,
  Text,
  QuantityButton,
  SmallText,
} from "../style";
class CheckoutCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      total: 0,
      edit: false,
    };
    //this.findProduct = this.findProduct.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.calculateTaxes = this.calculateTaxes.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    //this.handleTotal = this.handleTotal.bind(this);
  }

  componentDidMount() {
    this.props.loadCart(this.props.userId, this.props.isLoggedIn);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(this.props);
    }
  }

  async handleCheckout() {
    if (this.props.isLoggedIn) {
      const id = this.state.userId;
      const token = window.localStorage.getItem("token");
      await axios.put(
        `/api/users/${id}/confirmation`,
        { total: this.state.total },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } else {
      window.localStorage.setItem("cart", JSON.stringify([]));
    }
  }

  //TODO: handleUpdate
  handleQuantityUpdate(event) {
    event.preventDefault();
    // let newItems = this.state.items.map((item) => {
    //   if (item.productId == event.target.name) {
    //     item.quantity = Number(event.target.value);
    //     return item;
    //   }
    //   return item;
    // });
    // this.setState({ items: newItems });
    // this.handleTotal(this.state.total);
  }

  //TODO: delete here
  handleDelete(id, orderId, productId) {
    //Deletes an item from the cart
    if (this.props.isLoggedIn) {
      this.props.deleteItem(id, orderId, productId);

      this.setState({
        ...this.state,
      });
    } else {
      let cart = JSON.parse(window.localStorage.getItem("cart")).filter(
        (item) => {
          if (item.productId !== productId) return item;
        }
      );
      window.localStorage.setItem("cart", JSON.stringify(cart));
      console.log("cart in handleDelete->", cart);
    }
  }

  // handleTotal(prevTotal) {
  //   let total = 0;
  //   if (this.props.isLoggedIn) {
  //     if (this.state.items) {
  //       total = this.state.items.reduce((total, value) => {
  //         return value.currentPrice * value.quantity + total;
  //       }, 0);
  //     }
  //   } else {
  //     if (this.state.items)
  //       total = this.state.items.reduce((total, value) => {
  //         return value.price * value.quantity + total;
  //       }, 0);
  //   }

  //   return total / 100;
  // }

  // findProduct(productId) {
  //   if (this.props.isLoggedIn) {
  //     return this.state.products.filter(
  //       (item) => item.id == parseInt(productId)
  //     )[0];
  //   } else {
  //     return this.props.products.filter((item) => {
  //       return item.id == parseInt(productId);
  //     })[0];
  //   }
  // }

  calculateTaxes(subtotal) {
    let displayTotal = (subtotal * 0.04) / 100;

    return displayTotal;
  }
  render() {
    let { total } = this.state;
    const { calculateTaxes } = this;
    const { cart } = this.props;
    //let total = 0;
    let subtotal = {};
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    //let formattedSubtotal = formatter.format(subtotal);
    //let taxes = calculateTaxes(subtotal);
    //let formattedTaxes = formatter.format(taxes);
    //let formattedTotal = formatter.format(subtotal + taxes);

    let isShippingFree = false;

    // if (subtotal > 100) {
    //   isShippingFree = true;
    // }
    //console.log(isShippingFree);
    //console.log(subtotal);

    {
      cart.items &&
        cart.items.map((item) => {
          subtotal[item.id] = Number(item.price * item.cartItem?.quantity);
          total += Number(item.price * item.cartItem?.quantity);
        });
    }

    return (
      <div>
        {/* <h1 className="title">Shopping items</h1> */}
        <CartContainer>
          {cart.items &&
            cart.order &&
            cart.items.map((item) => (
              <div className="cartItem" key={item.id}>
                <List>
                  <Link to={`/products/${item.id}`}>
                    <LeftColumn>
                      <img
                        width="200"
                        height="200"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                    </LeftColumn>
                  </Link>
                  <RightColumn>
                    <LargeText>{item.name}</LargeText>
                    <h3>
                      ${item.price} x{" "}
                      {/* {this.state.edit && item.cartItem?.quantity > 0 && (
                        <QuantityButton
                          type="button"
                          onClick={() =>
                            this.handleSubtract(cocktail.id, 1, cocktail)
                          }
                        >
                          -
                        </QuantityButton>
                      )} */}
                      {item.cartItem?.quantity}
                      {/* {this.state.edit && cocktail.order_items?.quantity <= 10 && (
                        <QuantityButton
                          type="button"
                          onClick={() =>
                            this.handleAdd(cocktail.id, 1, cocktail)
                          }
                        >
                          +
                        </QuantityButton>
                      )} */}
                    </h3>
                    <div className="subtotal">
                      <h3>Subtotal: ${subtotal[item.id]}</h3>

                      <Button
                        onClick={() =>
                          this.setState((prevState) => ({
                            edit: !prevState.edit,
                          }))
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          this.handleDelete(
                            this.props.userId,
                            cart.order.id,
                            item.id
                          )
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </RightColumn>
                </List>
              </div>
            ))}

          {cart.items && cart.items.length > 0 ? (
            <div>
              <ButtonContainer>
                <LargeText>Total: ${cart.items && total}</LargeText>
              </ButtonContainer>
              <br />
              <ButtonContainer>
                <Button onClick={this.handleCheckout}>Checkout</Button>
              </ButtonContainer>
            </div>
          ) : (
            <CartContainer>
              <Link to="/products">
                <SmallText>
                  <ShoppingBag /> Back to Shopping
                </SmallText>
              </Link>
              <br />
              <LargeText>
                Oh no! Your cart is empty!
                <br />
              </LargeText>
            </CartContainer>
          )}
        </CartContainer>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadCart: (id, isLoggedIn) => dispatch(getCart(id, isLoggedIn)),

    loadAllProducts: () => dispatch(getProducts()),
    deleteItem: (id, orderId, productId) =>
      dispatch(removeItem(id, orderId, productId)),
    // updateItem: (id, orderId, productId, quantity, currentPrice) =>
    //   dispatch(updateCartItem(id, orderId, productId, quantity, currentPrice)),
  };
};

const mapState = (state) => {
  return {
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
  };
};

export default connect(mapState, mapDispatch)(CheckoutCart);
