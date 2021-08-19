import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  let login = displayName !== "Login";
  return (
    <section className="authForm__container section">
      <form onSubmit={handleSubmit} name={name} className="authForm">
        <label htmlFor="username">
          <p>Username</p>
        </label>
        <br />
        <input name="username" type="text" />
        <br />
        {login ? (
          <>
            <label htmlFor="email">
              <br />
              <p>Email</p>
            </label>
            <br />
            <input name="email" type="email" />
          </>
        ) : (
          <></>
        )}

        <label htmlFor="password">
          <br />
          <br />
          <p>Password</p>
        </label>
        <br />
        <input name="password" type="password" />
        <br />
        <br />
        <button
          style={{
            backgroundColor: "#ffa2b9",
            border: "none",
            padding: "1rem",
            color: "white",
            borderRadius: "4px",
          }}
          type="submit"
        >
          {displayName}
        </button>
        <br />
        <br />
        {error && error.response && <p> {error.response.data} </p>}
      </form>
    </section>
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
