import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { getNewCartItem } from "../store/cartitem";

class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { quantity: 1 };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }
    componentDidMount() {
        this.props.loadProduct(this.props.match.params.id);
    }
    // componentWillUnmount() {
    //     this.props.student.id = undefined;
    // }
    handleChange(event) {
        event.preventDefault();
        console.log("this is quantity", event.target.value);
        const quantity = event.target.value || 1;
        this.setState({ quantity });
    }

    handleAddToCart() {
        const cartitem = {
            productId: this.props.match.params.id, //productID
            quantity: this.state.quantity,
        };
        const userId = this.props.user.id;
        this.props.createCartItem(userId, cartitem);
    }
    render() {
        const product = this.props.singleProduct || {};
        // const quantity = this.props.singleProduct.quantity;
        // does cartitem need product id only or more?
        let price = product.price / 100;
        var formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
        price = formatter.format(price);
        return (
            <div>
                <h1>Single Product Page</h1>
                <img src={product.imageUrl} />
                <h3>name: {product.name}</h3>
                <h3>price: {`${price}`}</h3>
                <h3>description: {product.description}</h3>

                <select id="quantity" onChange={this.handleChange}>
                    <option value="1">Qty:1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button type="button" onClick={this.handleAddToCart}>
                    add to cart
                </button>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        singleProduct: state.singleProduct,
        isLoggedIn: !!state.auth.id,
        user: state.auth,
    };
};

const mapDispatch = (dispatch) => {
    return {
        loadProduct: (id) => {
            dispatch(fetchSingleProduct(id));
        },
        createCartItem: (userId, cartitem) => {
            dispatch(getNewCartItem(userId, cartitem));
        },
    };
};

export default connect(mapState, mapDispatch)(SingleProduct);
