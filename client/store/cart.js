import axios from "axios";
import { bindActionCreators } from "redux";

//ACTION NAME
const GOT_CART = "GOT_CART";
const REMOVED_ITEM = "REMOVED_ITEM";

//ACTION CREATORS
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

//THUNK ACTIONS

export const removeItem = (id, orderId, productId) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        try {
            const { data } = await axios.delete(`/api/users/${id}/viewCart`, {
                headers: {
                    authorization: token,
                },
                data: {
                    orderId,
                    productId,
                },
            });
            console.log("this is the data --->", data);
            dispatch(removedItem(data.items, data.products));
        } catch (error) {
            // return error
            console.error(error);
        }
    };
};

export const getCart = (id, auth) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        try {
            if (auth) {
                const { data } = await axios.get(`/api/users/${id}/viewCart`, {
                    headers: {
                        authorization: token,
                    },
                });
                dispatch(gotCart(data.items, data.products));
            } else {
                const { data } = await axios.get(`/api/products`);
                const items = JSON.parse(window.localStorage.getItem("cart"));
                console.log("this is the items --->", items);
                dispatch(gotCart(items, data));
            }
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
        case REMOVED_ITEM:
            return { ...state };
        default:
            return state;
    }
}
