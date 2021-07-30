import axios from "axios";

//ACTION NAME
const GOT_CART = "GOT_CART";
const REMOVED_ITEM = "REMOVED_ITEM";
const UPDATED_CART_ITEM = "UPDATED_CART_ITEM";

const gotCart = (items, products) => {
  return {
    type: GOT_CART,
    items,
    products,
  };
};

const removedItem = (items, products) => {
  return {
    type: REMOVED_ITEM,
    items,
    products,
  };
};

export const updatedCartItem = (
  id,
  currentPrice,
  quantity,
  orderId,
  productId
) => {
  return {
    type: UPDATED_CART_ITEM,
    id,
    currentPrice,
    quantity,
    orderId,
    productId,
  };
};

//THUNK ACTIONS
/******************** GET *********************/
export const getCart = (id, auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
      //auth meaning isLoggedin user
      if (auth) {
        const { data } = await axios.get(`/api/users/${id}/viewCart`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(gotCart(data.items, data.products));

        // if (cart != null && cart != "null") {
        //   dispatch(gotCart(cart));
        // } else {
        //   dispatch(gotCart({ order: {}, items: [] }));
        // }
      } else {
        const { data } = await axios.get(`/api/products`);
        const items = JSON.parse(window.localStorage.getItem("cart"));
        console.log("this is the items --->", items);
        dispatch(gotCart(items, data));
        // let cart = window.localStorage.getItem("cart");
        // if (cart != null && cart != "null") {
        //   cart = JSON.parse(cart);
        // } else {
        //   cart = {
        //     order: {},
        //     items: [],
        //   };
        // }
        // dispatch(gotCart(cart));
      }
    } catch (error) {
      // return error
      console.error(error);
    }
  };
};

/******************** DELETE *********************/
export const removeItem = (id, orderId, productId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
      const { data } = await axios.delete(`/api/users/${id}/deleteItem`, {
        headers: {
          authorization: token,
        },
        data: {
          orderId,
          productId,
        },
      });
      dispatch(removedItem(data.items, data.products));
    } catch (error) {
      // return error
      console.error(error);
    }
  };
};

/******************** PUT *********************/
//TODO: fix the update
export const updateCartItem = (
  id,
  currentPrice,
  quantity,
  orderId,
  productId
) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
      const { data } = await axios.put(
        `/api/users/${id}/updateCart`,
        { currentPrice, quantity, orderId, productId },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(
        updatedCartItem(
          data.currentPrice,
          data.quantity,
          data.orderId,
          data.productId
        )
      );
    } catch (error) {
      // return error
      console.error(error);
    }
  };
};

const intialState = { order: {}, items: [] };
//REDUCER
export default function cartReducer(state = intialState, action) {
  switch (action.type) {
    case GOT_CART:
      return { ...state, items: action.items, products: action.products };
    case REMOVED_ITEM:
      return { ...state };
    case UPDATED_CART_ITEM:
      return { ...state };
    default:
      return state;
  }
}
