import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {  Button } from "react-bootstrap";
const CreateProd = () => {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [harga, setHarga] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const history = useHistory();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("jenis", jenis);
    formData.append("harga", harga);
    formData.append("file", file);
    try {
      await axios.post("http://localhost:5000/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  const back = () => {
    history.push("/admin");
  }

  return (
    <div className="columns is-centered mt-5">
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
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
              />
            </div>
          </div>
          <div className="field">
              <label className="label">Jenis</label>
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    value="barang"
                    checked={jenis === "barang"}
                    onChange={(e) => setJenis(e.target.value)}
                  />
                  Barang
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    value="jasa"
                    checked={jenis === "jasa"}
                    onChange={(e) => setJenis(e.target.value)}
                  />
                  Jasa
                </label>
              </div>
            </div>
          <div className="field">
            <label className="label">Harga</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Harga Product"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                    required
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview && (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProd;
