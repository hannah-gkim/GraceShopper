export default function AppReducer(state, action) {
  switch (action.type) {
    case "GOT_PRODUCTS":
    
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
