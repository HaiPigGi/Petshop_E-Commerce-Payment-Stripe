import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link , useHistory} from "react-router-dom";
import {  Button } from "react-bootstrap";
import navAdmin from "./navAdmin";
const AdTransPage = () => {
  const [products, setProducts] = useState([]);
  const history= useHistory();
  useEffect(() => {
    getTransaksi();
  },[]);

  const getTransaksi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/payment");
      setProducts(response.data);
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
          className="mx-2 mb-5"
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
              <th>ID Transaksi</th>
              <th>ID Product</th>
              <th>ID Pelanggan</th>
              <th>ID Pegawai</th>
              <th>Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.id_Produk}</td>
                <td>{product.id_Pelanggan}</td>
                <td>{product.id_Pegawai}</td>
                <td> Rp.{product.total_harga}</td>
                <td>
                  <figure className="image is-4by3 card-image">
                  </figure>
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

export default AdTransPage;
