import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import SingleProduct from "./components/SingleProduct";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import CheckoutCart from "./components/CheckoutCart";
import Confirmation from "./components/Confirmation";
import AddedToCart from "./components/AddedToCart";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />

          <Route
            path="/login"
            render={() => (isLoggedIn ? <Redirect to="/" /> : <Login />)}
          />
          <Route
            path="/signup"
            render={() => (isLoggedIn ? <Redirect to="/" /> : <Signup />)}
          />

          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/viewCart" component={CheckoutCart} />
          <Route exact path="/confirmation" component={Confirmation} />
          <AddedToCart path="/addedToCart" />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
