import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51N5V5GK1ezlSiaycX0E1H7OruYV6ZZw7AMkvEB6x2o2Jn0jajjwq2ypNLcjhuqEkANTyWzqHZ8T4cT416dNwWhyj00Nu85SgO9"
);

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [harga, setHarga] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [idProduct, setproductId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [idd, setUserId] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

  useEffect(() => {
    getTransaksiById(id);
  }, [id]);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const cardToken = {
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCVC,
      };
      const response = await axios.post("http://localhost:5000/payment", {
        productId: id,
        quantity: quantity,
        cardToken: cardToken,
      });

      const { clientSecret, msg, userId,product,id_Produk } = response.data;

      if (msg === "Payment processed successfully") {
        setPaymentStatus("success");
        setProductName(product.name);
        setProductPrice(product.harga * quantity);
        setUserId(userId);
        setproductId(id_Produk);
      }
    } catch (error) {
      console.log(error.response.data);
      setPaymentStatus("error");
    }
  };

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/product/${id}`);
      const { name, jenis, harga, file } = response.data;
      setName(name);
      setJenis(jenis);
      setHarga(harga);
      setFile(file);
      setPreview(response.data.url);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getTransaksiById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/payment/${id}`);
      const { id_pelanggan: paymentId } = response.data;
      setPaymentId(paymentId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCloseModal = () => {
    setPaymentStatus("");
    setProductName("");
    setProductPrice("");
    setUserId("");
  };
  const updateHarga = (value) => {
    setQuantity(value);
    if (value === 1) {
      setHarga(harga / quantity);
    } else {
      setHarga(harga * value);
    }
  };
  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      {paymentStatus === "success" ? (
        <Modal
          show={paymentStatus === "success"}
          onHide={handleCloseModal}
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Payment Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <figure className="image is-4by3 card-image">
              <img
                src={preview}
                alt="Image"
                style={{
                  alignItems: "center",
                  width: "50%",
                  height: "40%",
                  border: "2px solid black",
                }}
              />
            </figure>
            <p>Product Name: {productName}</p>
            <p>Product Price: {productPrice}</p>
            {idProduct && <p>Your Product ID: {idProduct}</p>}
            {idd && <p>Your Payment ID: {idd}</p>}

          </Modal.Body>
          <Modal.Footer>
            <h5 className="notification">
              If you want to pick up your item at the store, please show your
              transaction ID.
            </h5>
          </Modal.Footer>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={paymentStatus !== ""} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {paymentStatus === "success"
                ? "Payment Successful"
                : "Payment Order"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {paymentStatus === "error" && (
              <p>Sorry, an error occurred during payment.</p>
            )}
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formJenis">
                <Form.Label>Jenis:</Form.Label>
                <Form.Control
                  type="text"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formHarga">
                <Form.Label>Harga:</Form.Label>
                <Form.Control
                  type="text"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => updateHarga(parseInt(e.target.value))}
                  min="1"
                />
              </Form.Group>
              <Form.Group controlId="formCardNumber">
                <Form.Label>Card Number:</Form.Label>
                <Form.Control
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCardExpMonth">
                <Form.Label>Card Expiry Month:</Form.Label>
                <Form.Control
                  type="text"
                  value={cardExpMonth}
                  onChange={(e) => setCardExpMonth(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCardExpYear">
                <Form.Label>Card Expiry Year:</Form.Label>
                <Form.Control
                  type="text"
                  value={cardExpYear}
                  onChange={(e) => setCardExpYear(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCardCVC">
                <Form.Label>Card CVC:</Form.Label>
                <Form.Control
                  type="text"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePayment}>
              Order Now
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <figure className="image is-4by3 card-image">
        <img
          src={preview}
          alt="Image"
          style={{
            width: "20%",
            height: "30%",
            border: "2px solid black",
          }}
        />
      </figure>
      <Button
        variant="outline-success"
        onClick={() => setPaymentStatus("open")}>
        Open Payment Form
      </Button>
    </div>
  );
};

export default PaymentPage;
