import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import auth from "./auth";

const initialState = {
  auth,
  singleProduct: {},
  products: [],
  cartitem: {},
  cart: { order: {}, items: [] },
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions / thunks

  async function allProducts() {
    try {
      const res = await axios.get("/api/products");
      console.log("res???-->", res.data);
      dispatch({
        type: "GOT_PRODUCTS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        auth: state.auth,
        singleProduct: state.singleProduct,
        products: state.products,
        cartitem: state.cartitem,
        cart: state.cart,
        allProducts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
