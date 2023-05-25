import React, { useState } from "react";
import axios from "axios";
import AdminNavigationBar from "../components/AdminNavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import useToken from "../hooks/useToken";

const AdminInverterCreatePage = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    model: "",
    user: "",
    ipAddress: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get("http://localhost:8080/admin_home/inverters")
      .then(response => {
        const newInverter = {
          id: 0,
          modelName: formData.model,
          userUsername: formData.user,
          IP: formData.ipAddress
        };
        axios.post("http://localhost:8080/admin_home/inverters/create", JSON.stringify(newInverter),
        { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } })
          .then(response => {
            console.log(response.data);
          })
          .then(() => { navigate('/admin_home/inverters') })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <AdminNavigationBar />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              className="form-control"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="user">User</label>
            <input
              type="text"
              className="form-control"
              id="user"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ipAddress">IP Address</label>
            <input
              type="text"
              className="form-control"
              id="ipAddress"
              name="ipAddress"
              value={formData.ipAddress}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminInverterCreatePage;
