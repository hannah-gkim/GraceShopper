import React from "react";
import { connect } from "react-redux";
import { deleteUser, getUsers } from "../store/allUsers";
import { getProducts } from "../store/allProducts";
import { Link } from "react-router-dom";
import axios from "axios";

//Admin should be able to view all users
//Need to pull in all current users

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], products: [] };
    this.handleUsers = this.handleUsers.bind(this)
  }

  componentDidMount() {
    this.props.loadAllUsers();
    this.props.loadAllProducts()
  }

  // componentDidUpdate(prevProps) {
  //   //conditions
  //   if (prevProps !== this.props) {
  //     this.setState(this.props);
  //   }
  // }

  handleDelete(event) {
    this.props.deleteUser(event.target.value);
    this.setState(this.props);
  }

   handleUsers(){

        //const Users = await axios.get('api/users') 
        this.props.loadAllUsers()


  }

  render() {
    console.log(this.props);
    const { users } = this.props;
    return (
      <div>
          <div className ='Buttons'>
          <button
              id="button"
              onClick={this.handleUsers}
              value={true}
              type="submit"
            >
              Next
            </button>
            {/* <button
              id="button"
              onClick={this.handlePage}
              value={true}
              type="submit"
            >
              Next
            </button> */}
            
      </div>
        <ul>
          {users
            ? users.map((users) => {
                return (
                  <Link to={`/users/${users.id}`} key={users.id}>
                    <li> {users.name}</li>
                  </Link>
                );
              })
            : "no users"}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    products: state.products
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadAllUsers: () => dispatch(getUsers()),
    loadAllProducts: ()=> dispatch(getProducts()),
    deleteUser: (id)=> dispatch(deleteUser(id))
  };
};

export default connect(mapState, mapDispatch)(Admin);
