import React from "react";
import { LogIn } from "react-feather";
import {
  CartContainer,
  List,
  LeftColumn,
  RightColumn,
  ButtonContainer,
  Button,
  LargeText,
  Text,
  QuantityButton,
  SmallText,
  Input,
} from "../style";
import { Link } from "react-router-dom";

export default function NotLoggedIn() {
  return (
    <div className="guest-cart-main">
      <div className="guest-cart-inner">
        <Link to="/login">
          <img
            width="550"
            src="https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
          />
          <br />

          <LargeText>
            <LogIn /> Please Log in to Shop! :D
          </LargeText>
        </Link>
      </div>
    </div>
  );
}
