import React, { useState,useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import {useHistory} from "react-router-dom";
import bg1 from "../public/bg1-imgLogin.png";
import bg2 from "../public/logo-Log1.webp";
import bg3 from "../public/wave.svg";

function Register() {
  const [active, setActive] = useState(false);
  const [users,setUser]=useState('');
  const [name, setName] =useState('');
  const [email, setEmail] =useState('');
  const [nomer, setNomer] =useState('');
  const [password, setPassword] =useState('');
  const [confPassword, setconfPassword] =useState('');
  const [msg,setMsg] =useState('');
  const [nomerError, setNomerError] = useState('');
  const history=useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const Register =async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", {
        name : name,
        email: email,
        nomer : nomer,
        password : password,
        confPassword : confPassword
      })
      history.push("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      
    }
  }
  
  return (
    <div
      className={`d-flex flex-column login-page bg-transition ${
        active ? "active" : ""
      }`}>
      <MDBContainer className="my-5">
        <MDBCard className="test">
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src={bg1}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody
                className={`d-flex flex-column login-page bg-transition ${
                  active ? "active" : ""
                }`}
                style={{
                  background: `url(${bg3})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center top",
                  backgroundRepeat: "no-repeat",
                }}>
                <div align="center" className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span
                    className="h1 fw-bold mb-0"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "400px",
                      height: "200px",
                      borderRadius: "60%",
                      overflow: "hidden",
                      marginLeft: "15%",
                      marginTop: "15%",
                      textAlign: "center",
                      backgroundColor: "white",
                    }}>
                    <img
                      src={bg2}
                      alt="Logo"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </span>
                </div>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{
                    letterSpacing: "1px",
                    fontSize: "42px",
                    color: " #000000",
                    fontFamily: "roboto serif",
                    fontStyle: "normal",
                    fontWeight: "600",
                    textShadow: "3px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}>
                  Sign Up
                </h5>
                <div className="login-container">
                  <p className="has-text-centered">{msg}</p>
                  <form method="POST" onSubmit={Register} >
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Name"
                        value={name} onChange={(e)=> setName (e.target.value)}
                        style={{
                          fontFamily: "Roboto Serif",
                          fontStyle: "normal",
                          fontWeight: "600",
                        }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="Email"
                        placeholder="Email"
                        value={email} onChange={(e)=> setEmail (e.target.value)}
                        style={{
                          fontFamily: "Roboto Serif",
                          fontStyle: "normal",
                          fontWeight: "600",
                        }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="No-Telpon"
                        placeholder="No Telpon"
                        value={nomer} onChange={(e)=> setNomer (e.target.value)}
                        style={{
                          fontFamily: "Roboto Serif",
                          fontStyle: "normal",
                          fontWeight: "600",
                        }}
                        pattern="[0-9]*" // hanya menerima karakter angka
                        inputMode="numeric" // menampilkan keyboard numerik pada perangkat mobile
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password} onChange={(e)=> setPassword (e.target.value)}
                        style={{
                          fontFamily: "Roboto Serif",
                          fontStyle: "normal",
                          fontWeight: "600",
                        }}
                        autoComplete="new-password" // tambahkan autocomplete dengan nilai new-password
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Confirm Password"
                        value={confPassword} onChange={(e)=> setconfPassword (e.target.value)}
                        style={{
                          fontFamily: "Roboto Serif",
                          fontStyle: "normal",
                          fontWeight: "600",
                        }}
                        autoComplete="new-password" // tambahkan autocomplete dengan nilai new-password
                      />
                    </div>
                    <button
                      type="submit"
                      className="login-text-wrapper-3"
                      style={{
                        background: "#C4D6FE",
                        width: "150px",
                        height: "38px",
                        fontFamily: "roboto serif",
                        fontStyle: "normal",
                        fontWeight: "600",
                        textShadow: "inherit",
                        boxShadow: "0px 3px 6px #00000029",
                        borderRadius: "8px",
                      }}>
                      Register
                    </button>
                  </form> 
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Register;
