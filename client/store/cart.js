import axios from "axios";

//ACTION NAME
const GOT_CART = "GOT_CART";

//ACTION CREATORS
const gotCart = (cart) => {
  return {
    type: GOT_CART,
    cart,
  };
};

//THUNK ACTIONS
export const getCart = () => {
  return async (dispatch) => {
    try {
        
      const { data } = await axios.get(`/api/users/${id}/viewCart`);
      console.log("this is the data --->", data);
      dispatch(gotCart(data));
    } catch (error) {
      // return error
    }
  };
};

const intialState = [];
//REDUCER
export default function cartReducer(state = intialState, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart;
    default:
      return state;
  }
}
