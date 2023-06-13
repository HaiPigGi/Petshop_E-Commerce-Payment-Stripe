import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link , useHistory} from "react-router-dom";
import {  Button } from "react-bootstrap";
import navAdmin from "./navAdmin";

const AdUserPage = () => {
  const [products, setProducts] = useState([]);
  const history= useHistory();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const back = () => {
    history.push("/admin");
  }

  return (
    <div>

    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Button
          variant="outline-dark"
          className="mx-2 mb-5"
          style={{
            borderRadius: "50px", // Membuat button menjadi oval
            border: "2px solid black", // Menambahkan border disekitarnya
          }}
          onClick={back}>
          Back
        </Button>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Id</th>
              <th>UUID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Nomer Telphone</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {products.map((users, index) => (
              <tr key={users.id}>
                <td>{users.id}</td>
                <td>{users.uuidd}</td>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.Nomer}</td>
                <td>{users.password}</td>
                <td>{users.role}</td>
                <td>
                  <figure className="image is-4by3 card-image">
                  </figure>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdUserPage;
