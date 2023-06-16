import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Home from './components/home';
import Contact from './components/Contact';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import EditProd from './components/pages/admin/editProd';
import CreateProd from './components/pages/admin/createProd';
import productLists from './components/pages/admin/productList';
import PaymentPage from './components/pages/transaksi/Paypage';
import ProductPage from './components/pages/ProductPage';
import HomeUser from './components/homeUser';
import HomeAdmin from './components/pages/admin/HomeAdmin';
import AdTransPage from './components/pages/admin/AdTransPage';
import AdUserPage from './components/pages/admin/AdUserPage';
import HomeOwner from './components/pages/Owner/HomeOwner';

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = sessionStorage.getItem('token');
  const email = sessionStorage.getItem('email');

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

function App() {
  const history = useHistory();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    sessionStorage.removeItem('token'); // Remove token from sessionStorage
    sessionStorage.removeItem('email'); // Remove email from sessionStorage
    history.replace('/login'); // Redirect to the login page
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    axios
      .get('http://localhost:5000/checkLogin')
      .then((response) => {
        const data = response.data;
        if (response.status === 200) {
          if (data.loggedIn) {
            // User is already logged in, save login information in session storage only if it doesn't exist
            if (!sessionStorage.getItem('token')) {
              sessionStorage.setItem('token', data.token);
              sessionStorage.setItem('email', data.email);
              sessionStorage.setItem('expirationTime', Date.now() + 300000); // Set expiration time to 5 menit from the current time
            }
          } else {
            // User is not logged in or the session has expired
            const storedToken = sessionStorage.getItem('token');
            const expirationTime = sessionStorage.getItem('expirationTime');
            if (!storedToken || (expirationTime && Date.now() > expirationTime)) {
              // Display a modal and redirect to the login page only if the user is on a page that requires a session
              if (
                location.pathname !== '/' &&
                !['/product', '/about', '/contact', '/login', '/register'].includes(location.pathname)
              ) {
                setShowModal(true);
              }
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Router>
      <div className="App">
        <br />
        <br />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/home/user" component={HomeUser} />
          <Route path="/product" component={ProductPage} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <PrivateRoute path="/admin" component={HomeAdmin} />
          <PrivateRoute path="/adminProduct" component={productLists} />
          <PrivateRoute path="/adminCret" component={CreateProd} />
          <PrivateRoute path="/edit/:id" component={EditProd} />
          <PrivateRoute path="/paymentList" component={AdTransPage} />
          <PrivateRoute path="/adminUser" component={AdUserPage} />
          <PrivateRoute path="/owner" component={HomeOwner} />
          <Route path="/payment/:id" component={PaymentPage} />
        </Switch>

        {/* Modal for session expiration */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Session Expired</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your session has expired. Please log in again.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Go to Login
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Router>
  );
}

export default App;
