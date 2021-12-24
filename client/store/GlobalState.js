import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import auth from "./auth";

const initialState = {
  auth: {},
  singleProduct: {},
  products: [],
  cartitem: {},
  cart: { order: {}, items: [] },
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions / thunks
  async function me() {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.get("/auth/me", {
          headers: {
            authorization: token,
          },
        });
        dispatch({
          type: "SET_AUTH",
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllProducts() {
    try {
      const { data } = await axios.get("/api/products");
      dispatch({
        type: "GOT_PRODUCTS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getNewCartItem(userId, newCartItem) {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.post(
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
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getSingleProduct(id) {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: "GET_SINGLE_PRODUCT",
        payload: data,
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
        getSingleProduct,
        me,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
