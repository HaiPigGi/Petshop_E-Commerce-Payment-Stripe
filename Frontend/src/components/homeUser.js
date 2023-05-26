import React from 'react';

import HomeProduct from './pages/homeProduct';
import HomeSlider from './pages/HomeSlider';
import FootersB from './pages/FooterB';
import 'animate.css/animate.min.css';
import NavbarUser from './pages/NavbarUser';
import './style/style.css';

const HomeUser = () => {

  return (
    <div>
      <section>
        <NavbarUser />
      </section>
      <section className="container my-5 animate__animated animate__fadeIn">
        <HomeSlider />
      </section>
      <section className="container my-5 animate__animated animate__fadeIn">
        <HomeProduct />
      </section>
      <section>
        <FootersB />
      </section>
    </div>
  );
};

export default HomeUser;
