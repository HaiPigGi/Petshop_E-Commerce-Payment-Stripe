import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import '../style/style.css';

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (id) => {
    try {
      const email = sessionStorage.getItem('email');
      const token = sessionStorage.getItem('token');
  
      // Check if email and token exist in session storage
      if (!email && !token) {
        // Redirect user to login
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
        // Unauthorized, redirect to login
        history.push("/login");
      } else {
        // Handle other errors
      }
    }
  };
  
  const displayedProducts = products.slice(0, 6); // Limit to 6 products

  return (
    <div className="container mt-5">
      <div className="columns is-multiline mt-2">
        <div className="column is-full">
          <div className="card-grid">
            {displayedProducts.map((product) => (
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
    </div>
  );
};

export default HomeProduct;
