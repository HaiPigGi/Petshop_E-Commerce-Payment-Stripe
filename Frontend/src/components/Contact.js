import React, { Component } from "react";
import ContactPage from "./pages/ContactPage";
import NavbarUser from "./pages/NavbarUser";
import NavbarComp from "./pages/NavbarComp";
import FooterB from "./pages/FooterB";

export default class Contact extends Component {
  render() {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    return (
      <div className="mt-6">
        {token && email ? <NavbarUser /> : <NavbarComp />}
        <br />
        <br />
        <br />
        <ContactPage />

        <section>
          <FooterB />
        </section>
      </div>
    );
  }
}
