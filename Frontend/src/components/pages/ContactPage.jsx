import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../style/style.css";

function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = sessionStorage.getItem("email");
    const token = sessionStorage.getItem("token");

    if (!email || !token) {
      // Redirect user to login
      history.push("/login");
      return;
    }
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
