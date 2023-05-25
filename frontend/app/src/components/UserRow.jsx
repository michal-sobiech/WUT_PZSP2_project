import React from "react";
import { Link } from "react-router-dom";

const UserRow = ({ username, name, surname, email }) => {
  return (
    <tr>
      <td>{username}</td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{email}</td>
      <td>
        <Link to={`/admin_home/users/edit/?username=${username}`} className="btn btn-primary">
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default UserRow;
