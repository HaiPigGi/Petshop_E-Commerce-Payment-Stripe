import React, { Component } from 'react';
import HomeProduct from "./pages/homeProduct";
import HomeSlider from "./pages/HomeSlider";
import FootersB from './pages/FooterB';
import "animate.css/animate.min.css";
import NavbarComp from './pages/NavbarComp';
import "./style/style.css";

class Home extends Component {
  render() {
    return (
      <div>
        <section>
          <NavbarComp/>
        </section>
        <section className="container my-5 animate__animated animate__fadeIn">
          <HomeSlider />
        </section>
        <section className="container my-5 animate__animated animate__fadeIn">
          <HomeProduct />
        </section>
        <section>
          <FootersB/>
        </section>
      </div>
    );
  }
}

export default Home;
