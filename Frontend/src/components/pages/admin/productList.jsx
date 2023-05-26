import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link , useHistory} from "react-router-dom";
import {  Button } from "react-bootstrap";
import navAdmin from "./navAdmin";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const history= useHistory();
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

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };
  const back = () => {
    history.push("/admin");
  }

  return (
    <div>

    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Button
          variant="outline-dark"
          className="mx-2"
          style={{
            borderRadius: "50px", // Membuat button menjadi oval
            border: "2px solid black", // Menambahkan border disekitarnya
          }}
          onClick={back}>
          Back
        </Button>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Jenis</th>
              <th>Harga</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.jenis}</td>
                <td>{product.harga}</td>
                <td>
                  <figure className="image is-4by3 card-image">
                    <img
                      src={product.url}
                      alt="Image"
                      style={{
                        width: "20%",
                        height: "30%",
                        border: "2px solid black",
                      }}
                    />
                  </figure>
                </td>
                <td>
                  <Link
                    to={`/edit/${product.id}`}
                    className="button is-small is-info mr-2">
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="button is-small is-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ProductList;
