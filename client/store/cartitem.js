import axios from "axios";

//action constants
const GOT_NEW_CART_ITEM = "GOT_NEW_CARTITEM";
const UPDATED_CART_ITEM = "UPDATED_CART_ITEM";

//action creators
export const gotNewCartItem = (newCartItem) => {
    return {
        type: GOT_NEW_CART_ITEM,
        newCartItem,
    };
};
export const updatedCartItem = (updatedCartItem) => {
    return {
        type: GOT_NEW_CART_ITEM,
        updatedCartItem,
    };
};

//thunks
// IS it even possible to send two arguments in this function below
export const getNewCartItem = (userId, newCartItem) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        try {
            const { data } = await axios.post(
                `/api/users/${userId}/cart`,
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
export default function cartitemReducer(state = intialState, action) {
    switch (action.type) {
        case GOT_NEW_CART_ITEM:
            return action.newCartItem; // check this again
        case UPDATED_CART_ITEM:
            return action.updatedCartItem; // check this again
        default:
            return state;
    }
}
