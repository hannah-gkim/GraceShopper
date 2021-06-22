import axios from "axios";
import { bindActionCreators } from "redux";

//ACTION NAME
const GOT_CART = "GOT_CART";

//ACTION CREATORS
const gotCart = (items, products) => {
  return {
    type: GOT_CART,
    items,
    products,
  };
};

//THUNK ACTIONS
export const getCart = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
      const { data } = await axios.get(`/api/users/${id}/viewCart`, {
        headers: {
          authorization: token,
        },
      });
      console.log("this is the data --->", data);
      dispatch(gotCart(data.items, data.products));
    } catch (error) {
      // return error
      console.error(error);
    }
  };
};

const intialState = {};
//REDUCER
export default function cartReducer(state = intialState, action) {
  switch (action.type) {
    case GOT_CART:
      return { ...state, items: action.items, products: action.products };
    default:
      return state;
  }
}
