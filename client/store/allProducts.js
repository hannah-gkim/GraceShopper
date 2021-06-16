import axios from "axios";

//ACTION NAME
const GOT_PRODUCTS = "GOT_PRODUCTS";

//ACTION CREATORS
const gotProducts = (products) => {
  return {
    type: GOT_PRODUCTS,
    products,
  };
};

//THUNK ACTIONS
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      console.log("this is the data --->", data);
      dispatch(gotProducts(data));
    } catch (error) {
      // return error
    }
  };
};

const intialState = [];
//REDUCER
export default function allProductsReducer(state = intialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
