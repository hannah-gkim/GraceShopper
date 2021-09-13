import axios from "axios";

//ACTION NAME
const GET_USERS = "GET_USERS";
const DELETE_USER = "DELETE_USER"

//ACTION CREATORS
const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

const _deleteUser = (id) => {
  return {
    type: DELETE_USER,
    users,
  };
};

//THUNK ACTIONS
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      //console.log("this is the data --->", data);
      dispatch(getUsers(data));
    } catch (error) {
      // return error
    }
  };
};


//THUNK ACTIONS
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
       await axios.delete("/api/user");
      dispatch(_deleteUser(id));
    } catch (error) {
      // return error
    }
  };
};

//REDUCER
export default function allUsersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case DELETE_USER:
        return state.filter((user)=> user.id !== action.id)
    default:
      return state;
  }
}
