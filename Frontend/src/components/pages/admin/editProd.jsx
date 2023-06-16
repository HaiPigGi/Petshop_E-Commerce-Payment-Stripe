import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./style/style.css"; // Import custom CSS file

const EditProd = () => {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [harga, setHarga] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getUserById();
  }, []);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("jenis", jenis);
    formData.append("harga", harga);
    formData.append("file", file);
    try {
      await axios.patch(`http://localhost:5000/product/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      history.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/product/${id}`);
    setName(response.data.name);
    setJenis(response.data.jenis);
    setHarga(response.data.harga);
    setFile(response.data.file);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateUser} className="form-container">
          <div className="form-field">
            <label className="form-label">Name</label>
            <div className="form-control">
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Jenis</label>
            <div className="form-control">
              <label className="form-radio">
                <input
                  type="radio"
                  value="barang"
                  checked={jenis === "barang"}
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
                placeholder="Masukkan Harga"
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
                  />
                  <span className="form-file-cta">
                    <span className="form-file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          {preview ? (
            <figure className="form-image-preview">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}
          <div className="form-field">
            <button type="submit" className="form-button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProd;
