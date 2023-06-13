import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./payment.css";
import card1 from "./public/chip.png";
import card2 from "./public/visa.png";
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
  const [email, setEmail] = useState("");
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
        email: email, // Include the email in the request
      });

      const { clientSecret, msg, userId, product, id_Produk } = response.data;

      if (msg === "Payment processed successfully") {
        setPaymentStatus("success");
        setProductName(product.name);
        setProductPrice(product.harga * quantity);
        setUserId(userId);
        setproductId(id_Produk);
        setEmail(email);

        // Send email notification
        const storeName = "Zoepy Petshop";
        const emailSubject = "Payment Successfull";
        const emailText = `\tThank you for your payment at ${storeName}! Your payment was successful.
        We hope you are satisfied with the products you purchased and had a delightful shopping experience at our store. 
        We always strive to provide quality products and excellent customer service to our valued customers.
       \t Please retain the following details for your reference:
        
        Store: ${storeName}
        Product: ${product.name}
        Price: ${product.harga}
        Payment ID: ${userId}
        
        If you have any questions or need further assistance, please don't hesitate to contact us. Enjoy your purchase!
        
        Best regards,
        ${storeName}`;
        const send = await axios.post("http://localhost:5000/sendMail", {
          to: email, // Use the recipient email obtained from the response data
          subject: emailSubject,
          text: emailText,
        });
        console.log(send.data);
        console.log(email);
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

  const handleCardNumberInput = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpMonthInput = (event) => {
    setCardExpMonth(event.target.value);
  };

  const handleExpYearInput = (event) => {
    setCardExpYear(event.target.value);
  };

  const handleCVVInput = (event) => {
    setCardCVC(event.target.value);
  };

  const handleCVVMouseEnter = () => {
    document.querySelector(".front").style.transform =
      "perspective(1000px) rotateY(-180deg)";
    document.querySelector(".back").style.transform =
      "perspective(1000px) rotateY(0deg)";
  };

  const handleCVVMouseLeave = () => {
    document.querySelector(".front").style.transform =
      "perspective(1000px) rotateY(0deg)";
    document.querySelector(".back").style.transform =
      "perspective(1000px) rotateY(180deg)";
  };

  const handleCVVInputChange = () => {
    document.querySelector(".cvv-box").innerText = cardCVC;
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
              transaction ID Or You Can See In Your Email.
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
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Please Input Your Real Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <div className="container mt-5">
                <div className="card-container">
                  <div className="front">
                    <div className="image">
                      <img src={card1} alt="" />
                      <img src={card2} alt="" />
                    </div>
                    <div className="card-number-box">{cardNumber}</div>
                    <div className="flexbox">
                      <div className="box">
                        <span>expires</span>
                        <div className="expiration">
                          <span className="exp-month">{cardExpMonth}</span>
                          <span className="exp-year">{cardExpYear}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="back">
                    <div className="stripe"></div>
                    <div className="box">
                      <span>cvv</span>
                      <div className="cvv-box">{cardCVC}</div>
                      <img src="image/visa.png" alt="" />
                    </div>
                  </div>
                </div>

                <form action="">
                  <div className="inputBox">
                    <span>card number</span>
                    <input
                      type="text"
                      maxLength="16"
                      className="card-number-input"
                      value={cardNumber}
                      onChange={(e) => {
                        setCardNumber(e.target.value);
                        handleCardNumberInput(e);
                      }}
                    />
                  </div>

                  <div className="flexbox">
                    <div className="inputBox">
                      <span>expiration mm</span>
                      <select
                        name=""
                        id=""
                        className="month-input"
                        value={cardExpMonth}
                        onChange={(e) => {
                          setCardExpMonth(e.target.value);
                          handleExpMonthInput(e);
                        }}>
                        <option value="month" selected disabled>
                          month
                        </option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <div className="inputBox">
                      <span>expiration yy</span>
                      <select
                        name=""
                        id=""
                        className="year-input"
                        value={cardExpYear}
                        onChange={(e) => {
                          setCardExpYear(e.target.value);
                          handleExpYearInput(e);
                        }}>
                        <option value="year" selected disabled>
                          year
                        </option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                      </select>
                    </div>
                  </div>
                  <div className="inputBox">
                    <span>cvv</span>
                    <input
                      type="text"
                      maxLength="3"
                      className="cvv-input"
                      value={cardCVC}
                      onChange={(e) => {
                        setCardCVC(e.target.value);
                        handleCVVInput(e);
                      }}
                      onMouseEnter={handleCVVMouseEnter}
                      onMouseLeave={handleCVVMouseLeave}
                      onInput={handleCVVInputChange}
                    />
                  </div>
                </form>
              </div>
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
