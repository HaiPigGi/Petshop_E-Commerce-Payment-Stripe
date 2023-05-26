import React, { useState,useEffect  } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import "../style/style.css";
import axios from "axios"
import bg1 from "../public/bg1-imgLogin.png";
import bg2 from "../public/logo-Log1.webp";
import bg3 from "../public/wave.svg";


function Login() {
  const [active] = useState(false);
  
  const [users,setUser]=useState('');
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const [msg,setMsg] =useState('');
  
  const history = useHistory();

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

  const Periksa = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      }, {
        withCredentials: true, // Mengirim cookies session
      });
      const { redirectTo } = response.data;
  
      // Check if response data exists
      if (response.data) {
        const { email, token } = response.data;
        if (email && token) {
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('token', token);
        }
      }
  
      console.log(sessionStorage);
  
      history.push(redirectTo);
    } catch (error) {
      if (error.response && error.response.data) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("An error occurred during login.");
      }
    }
  };
  

  const handleSignUp = () => {
    history.push({ pathname: "/register", state: { redirectTo: "Register" } });
    window.close(); // Menutup halaman login
  };

  // const handleForgotPass=async (e)=> {
  //   history.push("/UserUpdate");
  // }

  return (
    <Router>
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
                    Login
                  </h5>
                  <div className="login-container">
                    <form onSubmit={Periksa}>
                      <div className="form-group mb-3">
                      <p className="has-text-centered">{msg}</p>
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter your email"
                          value={email} onChange={(e)=> setEmail (e.target.value)}
                          style={{
                            fontFamily: "Roboto Serif",
                            fontStyle: "normal",
                            fontWeight: "600",
                          }}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter your password"
                          value={password} onChange={(e)=> setPassword (e.target.value)}
                          style={{
                            fontFamily: "Roboto Serif",
                            fontStyle: "normal",
                            fontWeight: "600",
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-login mt-4" style={{
                          background: "#C4D6FE",
                          width: "150px",
                          color :"black",
                          height: "38px",
                          fontFamily: "roboto serif",
                          fontStyle: "normal",
                          fontWeight: "600",
                          textShadow: "inherit",
                          boxShadow: "0px 3px 6px #00000029",
                          borderRadius: "8px",
                        }}>
                        Login
                      </button>
                      <div className="ml-auto mt-5 d-flex align-items-center justify-content-center">
                        <p className="mb-0 mr-2">Don't have an account yet?</p>
                        <button
                          type="button"
                          className="btn btn-link p-0"
                          onClick={handleSignUp} >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
    </Router>
  );
}

export default Login;
