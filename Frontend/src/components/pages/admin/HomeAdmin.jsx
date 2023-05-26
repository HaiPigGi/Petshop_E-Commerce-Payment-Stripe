import React from "react";
import NavAdmin from "./navAdmin";
import ProductList from "./productList";
import Welcome from "./Welcome";
const HomeAdmin = () => {
  return (
    <div className="container my-5 animate__animated animate__fadeIn">
      <section>
        <Welcome />
      </section>
      <section>
        <NavAdmin />
      </section>
    </div>
  );
};

export default HomeAdmin;
