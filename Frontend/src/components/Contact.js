<<<<<<< HEAD
import React, { Component } from "react";
import ContactPage from "./pages/ContactPage";
import NavbarUser from "./pages/NavbarUser";
import NavbarComp from "./pages/NavbarComp";
import FootersB from "./pages/FooterB";
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
          <FootersB />
        </section>
=======
import React, { Component } from 'react'
import ContactPage from './pages/ContactPage';
import NavbarUser from './pages/NavbarUser';
import NavbarComp from './pages/NavbarComp';
export default class Contact extends Component {
  render() {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');

      return (
        <div className='mt-6'>
        {token && email ? <NavbarUser /> : <NavbarComp />}
          <br/>
        <ContactPage/>
>>>>>>> b39ca943dc7d7bbcf26da6f968ce0e6e8c2840ce
      </div>
    );
  }
}
