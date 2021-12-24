export default function AppReducer(state, action) {
  switch (action.type) {
    case "SET_AUTH":
      return { auth: action.payload };
    case "GOT_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GOT_NEW_CART_ITEM":
      return { ...state, cartItem: action.payload };
    case "GET_SINGLE_PRODUCT":
      return { ...state, singleProduct: action.payload };
    case "GOT_CART":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}
