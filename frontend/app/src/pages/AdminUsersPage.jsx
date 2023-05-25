import React, { useContext } from "react";
import UserRow from "../components/UserRow";
import AdminNavigationBar from "../components/AdminNavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import MyContext from "../contexts/MyContext";
import { useNavigate } from 'react-router-dom';


const AdminUsersPage = () => {
  const { users } = useContext(MyContext);
  const filteredUsers = users.filter(user => user.role === "user");
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate('/admin_home/users/create')
  };

  return (
    <div>
      <AdminNavigationBar />
      <button className="btn btn-primary" onClick={handleCreateClick}>Create new user</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <UserRow key={user.username} {...user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
