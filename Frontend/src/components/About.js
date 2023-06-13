import React, { Component } from "react";
import AboutPage from "./pages/about";
import NavbarUser from "./pages/NavbarUser";
import NavbarComp from "./pages/NavbarComp";
import FootersB from "./pages/FooterB";
export default class About extends Component {
  render() {
    // Cek nilai sessionStorage token dan email
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    return (
      <div className="mt-6">
        {token && email ? <NavbarUser /> : <NavbarComp />}
        <AboutPage />

        <section>
          <FootersB />
        </section>
      </div>
    );
  }
}
