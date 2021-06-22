import axios from "axios"

//action constants 
const GOT_NEW_CARTITEM = "GOT_NEW_CARTITEM"

//action creators
export const gotNewCartItem = (newCartItem) => {
    return {
        type: "GOT_NEW_CARTITEM",
        newCartItem
    }
}

//thunks 
// IS it even possible to send two arguments in this function below
export const getNewCartItem = (userId, newCartItem) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.post(`/api/users/${userId}/cart`, newCartItem)
            dispatch(gotNewCartItem(data))
        } catch (error) {
            console.log(error)
        }
    }
}

const intialState = {}
//reducer
export default function cartitemReducer (state = intialState, action) {
    switch (action.type) {
        case GOT_NEW_CARTITEM: 
            return action.newCartItem;
        default: 
            return state;
    }
}