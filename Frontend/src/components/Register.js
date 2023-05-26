import React, { Component } from "react";
import RegPage from "./pages/RegPage";

export default class Register extends Component {
  render() {
   // const { state } = this.props.location;
    //const from = state ? state.from : "/Login";

    return (
      <div>
        <RegPage />
      </div>
    );
  }
}
