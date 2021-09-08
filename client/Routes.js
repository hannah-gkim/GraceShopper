import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
//store
import { me } from "./store";
//components
import Home from "./components/Home/Home";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import AddedToCart from "./components/AddedToCart";
import CheckoutCart from "./components/CheckoutCart";
import Confirmation from "./components/Confirmation";
import NotLoggedIn from "./components/NotLoggedIn";
import { Login, Signup } from "./components/AuthForm";
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
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
          <Route
            exact
            path="/viewCart"
            render={() => (isLoggedIn ? <CheckoutCart /> : <NotLoggedIn />)}
          />
          <Route exact path="/confirmation" component={Confirmation} />
          <Route
            exact
            path="/addedToCart"
            render={() => (isLoggedIn ? <AddedToCart /> : <NotLoggedIn />)}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

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
