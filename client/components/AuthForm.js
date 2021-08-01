import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Container, Button, SmallText } from "../style";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  let login = displayName !== "Login";
  return (
    <Container>
      <form onSubmit={handleSubmit} name={name}>
        <label htmlFor="username">
          <SmallText>Username</SmallText>
        </label>
        <input name="username" type="text" />
        <br />
        {login ? (
          <>
            <label htmlFor="email">
              <SmallText>Email</SmallText>
            </label>
            <input name="email" type="email" />
          </>
        ) : (
          <></>
        )}

        <label htmlFor="password">
          <SmallText>Password</SmallText>
        </label>
        <input name="password" type="password" />
        <br />
        <br />
        <Button type="submit">{displayName}</Button>
        <br />
        <br />
        {error && error.response && (
          <SmallText> {error.response.data} </SmallText>
        )}
      </form>
    </Container>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      let email = "";
      if (evt.target.email) email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
