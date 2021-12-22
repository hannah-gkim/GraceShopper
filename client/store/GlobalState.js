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
  async function getAllProducts() {
    try {
      const res = await axios.get("/api/products");
      dispatch({
        type: "GOT_PRODUCTS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getNewCartItem(userId, newCartItem) {
    try {
      const token = window.localStorage.getItem("token");
      const res = await axios.post(
        `/api/users/${userId}/addToCart`,
        {
          newCartItem,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({
        type: "GOT_NEW_CART_ITEM",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSingleProduct(id) {
    try {
      const res = await axios.get(`/api/products/${id}`);
      dispatch({
        type: "GET_SINGLE_PRODUCT",
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
        getAllProducts,
        getNewCartItem,
        fetchSingleProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
