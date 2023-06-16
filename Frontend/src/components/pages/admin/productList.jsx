import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import navAdmin from "./navAdmin";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const history = useHistory();

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

  const handleDeleteConfirmation = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    deleteProduct(selectedProductId);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
    setShowModal(false);
  };

  const back = () => {
    history.push("/admin");
  };

  return (
    <div>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <Button
            variant="outline-dark"
            className="mx-2"
            style={{
              borderRadius: "50px",
              border: "2px solid black",
            }}
            onClick={back}
          >
            Back
          </Button>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
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
                      <div className="button-group">
                        <Button
                          variant="info"
                          size="sm"
                          className="mr-2"
                          onClick={() => history.push(`/edit/${product.id}`)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteConfirmation(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
