import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./style/style.css";

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
  };

  return (
    <div className="columns is-centered mt-5">
      <Button
        variant="outline-dark"
        className="mx-2 mb-5"
        style={{
          borderRadius: "50px",
          border: "2px solid black",
        }}
        onClick={back}
      >
        Back
      </Button>
      <div className="column is-half">
        <form onSubmit={saveProduct} className="form-container">
          <div className="form-field">
            <label className="form-label">Product Name</label>
            <div className="form-control">
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Jenis</label>
            <div className="form-control">
              <label className="form-radio">
                <input
                  type="radio"
                  value="Barang"
                  checked={jenis === "Barang"}
                  onChange={(e) => setJenis(e.target.value)}
                />
                Barang
              </label>
              <label className="form-radio">
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
          <div className="form-field">
            <label className="form-label">Harga</label>
            <div className="form-control">
              <input
                type="number"
                className="form-input"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Harga Product"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Image</label>
            <div className="form-control">
              <div className="form-file">
                <label className="form-file-label">
                  <input
                    type="file"
                    className="form-file-input"
                    onChange={loadImage}
                    required
                  />
                  <span className="form-file-cta">
                    <span className="form-file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview && (
            <figure className="form-image-preview">
              <img src={preview} alt="Preview Image" />
            </figure>
          )}

          <div className="form-field">
            <div className="form-control">
              <button type="submit" className="form-button">
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
