import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route,  Redirect } from 'react-router-dom';
import Home from './components/home';
import Contact from "./components/Contact";
import About from "./components/About";
import Login from "./components/Login";
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
//import UserUpPage from './components/pages/UserUpPage';
function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = sessionStorage.getItem('token');
  const email = sessionStorage.getItem('email');

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && email === 'Adminzoepy@gmail.com' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <br />
        <br />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home/user" component={HomeUser} />
          <Route path="/product" component={ProductPage} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <PrivateRoute path="/admin" component={HomeAdmin} />
          <PrivateRoute path="/adminProduct" component={productLists} />
          <PrivateRoute path="/adminCret" component={CreateProd} />
          <PrivateRoute path="/edit/:id" component={EditProd} />
          <PrivateRoute path="/paymentList" component={AdTransPage} />
          <PrivateRoute path="/adminUser" component={AdUserPage} />
          <Route path="/payment/:id" component={PaymentPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


