import axios from "axios";

//ACTION NAME
const GET_PRODUCTS = "GET_PRODUCTS";

//ACTION CREATORS
const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

//THUNK ACTIONS
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(_getProducts(data));
    } catch (error) {
      // return error
    }
  };
};

//REDUCER
export default (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...state, action.products];

    default:
      return state;
  }
};
