import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavigationBar from "../components/AdminNavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from 'react-router-dom';
import useToken from "../hooks/useToken";

const AdminInverterEditPage = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    id: "",
    model: "",
    user: "",
    ipAddress: ""
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get("id");
    setFormData((prevFormData) => ({ ...prevFormData, id: id }));
  }, [location.search]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newInverter = {
      id: formData.id,
      modelName: formData.model,
      userUsername: formData.user,
      IP: formData.ipAddress
    };
    axios.put(`http://localhost:8080/admin_home/inverters/edit`, JSON.stringify(newInverter),
      { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } })
      .then(response => {
        console.log(response.data);
        navigate('/admin_home/inverters')
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
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminInverterEditPage;
