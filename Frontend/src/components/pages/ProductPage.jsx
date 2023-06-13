import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/style.css";
import NavbarUser from './NavbarUser';
import NavbarComp from './NavbarComp';
import FootersB from "./FooterB";
import { useHistory } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const token = sessionStorage.getItem('token');
  const email = sessionStorage.getItem('email');

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (id) => {
    try {
      const email = sessionStorage.getItem('email');
      const token = sessionStorage.getItem('token');
  
      if (!email || !token) {
        history.push("/login");
        return;
      }
  
      const response = await axios.get(`http://localhost:5000/product/$${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        history.push(`/payment/${id}`);
      } else {
        // Handle error case
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        history.push("/login");
      } else {
        // Handle other errors
      }
    }
  };
  
  return (
    <div>
      {token && email ? <NavbarUser /> : <NavbarComp />}
      <div className="container mt-5">
        <div className="columns is-multiline mt-2">
          <div className="column is-full">
            <div className="card-grid">
              {products.map((product) => (
                <div className="card has-background-cyan" key={product.id}>
                  <div className="card-image">
                    <div align="center" className="product-item">
                      <img
                        src={product.url}
                        alt="Image"
                        className="centered-image"
                      />
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{product.name}</p>
                      </div>
                    </div>
                  </div>
                  <footer className="card-footer">
                    <button
                      onClick={() => handleBuy(product.id)}
                      className="card-footer-item buy-button"
                    >
                      Buy
                    </button>
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section>
          <FootersB />
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
