import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import navAdmin from "./navAdmin";

const AdTransPage = () => {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const history = useHistory();

  useEffect(() => {
    getTransaksi();
  }, []);

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
  };

  const handleSearch = () => {
    const filtered = products.filter(
      (product) => product.id_Pelanggan === searchId
    );
    setFilteredProducts(filtered);
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    searchId !== ""
      ? filteredProducts
      : products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <Button
            variant="outline-dark"
            className="mx-2 mb-5"
            style={{
              borderRadius: "50px",
              border: "2px solid black",
            }}
            onClick={back}>
            Back
          </Button>
          <div className="mb-3">
            <label htmlFor="searchId" className="form-label">
              Search Payment ID:
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="searchId"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleSearch}
                style={{ borderRadius: "50px", marginLeft: "10px" }}>
                Search
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
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
                {currentProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.id}</td>
                    <td>{product.id_Produk}</td>
                    <td>{product.id_Pelanggan}</td>
                    <td>{product.id_Pegawai}</td>
                    <td> Rp.{product.total_harga}</td>
                    <td>
                      <figure className="image is-4by3 card-image"></figure>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              {searchId === ""
                ? Array.from({
                    length: Math.ceil(products.length / productsPerPage),
                  }).map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                        style={{
                          backgroundColor:
                            currentPage === index + 1 ? "#394867" : "white",
                          color: currentPage === index + 1 ? "#394867" : "black",
                          borderRadius: "50%",
                          border: "1px solid black",
                          marginLeft: "5px",
                        }}>
                        {index + 1}
                      </button>
                    </li>
                  ))
                : null}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdTransPage;
