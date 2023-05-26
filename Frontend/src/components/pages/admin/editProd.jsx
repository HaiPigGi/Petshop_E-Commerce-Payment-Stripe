import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useHistory} from "react-router-dom";

const EditProd = () => {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [harga, setHarga] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();

  const history=useHistory();

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
      await axios.patch(`http://localhost:5000/product/${id}`,formData, {
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
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
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
          </div>
          <div className="field">
            <label className="label">Harga</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Masukkan Harga"
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
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProd;
