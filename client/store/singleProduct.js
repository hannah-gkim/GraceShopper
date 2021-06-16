import axios from "axios";

//type
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";

//creator
const setProduct = (product) => ({
    type: GET_SINGLE_PRODUCT,
    product,
});

//thunk
export const fetchSingleProduct = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/products/${id}`);
            dispatch(setProduct(data));
        } catch (error) {
            console.error(error);
        }
    };
};

//reducer
const initialState = {};
export default function singleProductReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SINGLE_PRODUCT:
            return action.product;
        default:
            return state;
    }
}

//export
