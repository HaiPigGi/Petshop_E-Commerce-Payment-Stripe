import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import logo from "../public/logo.png";
import "../style/style.css";

function NavbarComp() {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    if (isScrolled !== scrolled) {
      setScrolled(!scrolled);
    }
  };

  useEffect(() => {
    setShow(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);



  return (
    <Router>
      <div
        className={
          show
            ? `navbar-wrapper ${scrolled ? "scrolled" : ""} show`
            : "navbar-wrapper hide"
        }
      >
        <Navbar variant="dark" expand="lg" className="navbar-container">
          <h3>Zoepy </h3>
          <h3> Petshop</h3>
          <Nav className="navbar-nav-center">
            <Nav.Link as="a" href="/">
              Home
            </Nav.Link>
            <Nav.Link as="a" href="/product">
              Product
            </Nav.Link>
            <Nav.Link as="a" href="/about">
              About
            </Nav.Link>
            <Nav.Link as="a" href="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Navbar.Brand className="navbar-logo">
            <img src={logo} height="30" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link as="a" href="/login">
                  <Button
                    variant="outline-dark"
                    className="mx-2"
                    style={{
                      borderRadius: "50px", // Membuat button menjadi oval
                      border: "2px solid black", // Menambahkan border disekitarnya
                    }}
                  >
                    Login
                  </Button>
                </Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Navbar>
      </div>
    </Router>
  );
}

export default NavbarComp;

