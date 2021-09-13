import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//import reducers
import auth from "./auth";
import singleProduct from "./singleProduct";
import allProductsReducer from "./allProducts";
import addToCartReducer from "./addToCart";
import cartReducer from "./cart";


const reducer = combineReducers({
  auth,
  singleProduct: singleProduct,
  products: allProductsReducer,
  cartitem: addToCartReducer,
  cart: cartReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
