import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
<<<<<<< HEAD
import "../style/style.css";
=======
>>>>>>> b39ca943dc7d7bbcf26da6f968ce0e6e8c2840ce

function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

<<<<<<< HEAD
    const email = sessionStorage.getItem("email");
    const token = sessionStorage.getItem("token");
=======
    const email = sessionStorage.getItem('email');
    const token = sessionStorage.getItem('token');
>>>>>>> b39ca943dc7d7bbcf26da6f968ce0e6e8c2840ce

    if (!email || !token) {
      // Redirect user to login
      history.push("/login");
      return;
    }
<<<<<<< HEAD
=======

>>>>>>> b39ca943dc7d7bbcf26da6f968ce0e6e8c2840ce
    try {
      const response = await axios.post("http://localhost:5000/sendMail", {
        to: "anjaybetul2@gmail.com",
        subject: name,
        text: message,
      });
      console.log(response.data);
      setSuccessMessage("Terima kasih atas masukkan Anda");
    } catch (error) {
      console.error(error);
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi nanti.");
    }

    setName("");
    setMessage("");
  };

  return (
<<<<<<< HEAD
    <div className="container contact">
      <h1 className="contact-heading">Contact Us</h1>
      {successMessage && (
        <Alert variant="success" className="contact-alert">
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" className="contact-alert">
          {errorMessage}
        </Alert>
      )}
=======
    <div className="container">
      <h1>Contact Us</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
>>>>>>> b39ca943dc7d7bbcf26da6f968ce0e6e8c2840ce
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit" className="contact-button">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Contact;
