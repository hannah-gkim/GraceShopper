import axios from "axios";

//action constants
const GOT_NEW_CART_ITEM = "GOT_NEW_CARTITEM";

//action creators
export const gotNewCartItem = (newCartItem) => {
  return {
    type: GOT_NEW_CART_ITEM,
    newCartItem,
  };
};

//thunks
//adding to cart happenes in singleProduct
export const getNewCartItem = (userId, newCartItem) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
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
      dispatch(gotNewCartItem(data));
      // }
    } catch (error) {
      console.log(error);
    }
  };
};

const intialState = {};
//reducer
export default function addToCartReducer(state = intialState, action) {
  switch (action.type) {
    case GOT_NEW_CART_ITEM:
      return action.newCartItem;
    default:
      return state;
  }
}
