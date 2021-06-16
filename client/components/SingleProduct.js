import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

class SingleProduct extends Component {
    // constructor() {
    //     super();
    // }
    componentDidMount() {
        this.props.loadProduct(this.props.match.params.id);
    }
    // componentWillUnmount() {
    //     this.props.student.id = undefined;
    // }
    render() {
        const product = this.props.product || {};
        console.log(this.props.product);
        return (
            <div>
                <h1>Single Product Page</h1>
                <h3>name: {product.name}</h3>
            </div>
        );
    }
}

const mapState = ({ product }) => {
    return { product };
};

const mapDispatch = (dispatch) => {
    return {
        loadProduct: (id) => {
            dispatch(fetchSingleProduct(id));
        },
    };
};

export default connect(mapState, mapDispatch)(SingleProduct);
