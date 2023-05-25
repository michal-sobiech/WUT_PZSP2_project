import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavigationBar from "../components/AdminNavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from 'react-router-dom';
import useToken from "../hooks/useToken";

const AdminUserEditPage = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const username = query.get("username");
    setFormData((prevFormData) => ({ ...prevFormData, username: username }));
  }, [location.search]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      username: formData.username,
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password
    };
    axios.put(`http://localhost:8080/admin_home/users/edit`, JSON.stringify(newUser),
      { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } })
      .then(response => {
        console.log(response.data);
        navigate('/admin_home/users')
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
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
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

export default AdminUserEditPage;
