import React, { useContext } from "react";
import InverterRow from "../components/InverterRow";
import AdminNavigationBar from "../components/AdminNavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import MyContext from "../contexts/MyContext";
import { useNavigate } from 'react-router-dom';


const AdminInvertersPage = () => {
  const { inverters } = useContext(MyContext);
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate('/admin_home/inverters/create')
  };

  return (
    <div>
        <AdminNavigationBar />
        <button className="btn btn-primary" onClick={handleCreateClick}>Create new inverter</button>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Model</th>
                    <th>User</th>
                    <th>IP Address</th>
                </tr>
            </thead>
        <tbody>
          {inverters.map((inverter) => (
            <InverterRow key={inverter.id} {...inverter} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminInvertersPage;
