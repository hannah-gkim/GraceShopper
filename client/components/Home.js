import React from "react";
import { connect } from "react-redux";
import { Img } from "../style";

export const Home = (props) => {
  const { username } = props;

  return (
    <Img>
      <img
        width="1270"
        height="auto"
        src="https://images.unsplash.com/photo-1489348611450-4c0d746d949b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1352&q=80"
      />
    </Img>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
