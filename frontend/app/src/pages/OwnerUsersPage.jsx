import React, { useState } from 'react';
import { Grid } from '@mui/material';
import OwnerAppBar from '../components/OwnerAppBar';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import MyContext from '../contexts/MyContext';
import useToken from '../hooks/useToken';
import { Table } from '@mui/material';
import * as restutils from '../utils/restutils';
import { backendAddress, ownerHome, ownerUsersCreate, ownerUsers, ownerUsersEdit } from '../utils/pathutils';
import { placeTableHeader, placeUserTableBody} from '../utils/placementutils';
import StandardTextField from '../components/StandardTextField';
import DisabledTextFieldGrid from '../components/DisabledTextFieldGrid';
import HalfSizeButton from '../components/HalfSizeButton';
import LargeContainedRectangleButton from '../components/LargeContainedRectangleButton';
import ContainedRectangleButton from '../components/ContainedRectangleButton';
import HeaderGrid from '../components/HeaderGrid';
import RedHalfSizeButton from '../components/RedHalfSizeButton';
import MinorHeaderGrid from '../components/MinorHeaderGrid';
import { oneRem } from '../theme'; 







const OwnerUsersPage = () => {
  let data = useContext(MyContext);
  let [token, setToken] = useToken();

  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = async () => {
    console.log(`Searching for user with nickname "${nickname}"`);
    const responseJson = await restutils.getJson(
      backendAddress + ownerHome + `/get_user?username=${nickname}`, token
    )
    console.log(responseJson);
    handleResponse(responseJson);
  };

  function handleResponse(responseJson) {
    if (responseJson == null){
      clearUserFields();
    }
    if (responseJson.role === "user"){
      setName(responseJson.name);
      setSurname(responseJson.surname);
      setPassword(responseJson.password);
      setEmail(responseJson.email);
    }
    else {
      clearUserFields();
    }
  } 

  const clearUserFields = () => {
    setName('');
    setSurname('');
    setPassword('');
    setEmail('');
  }

  const handleCreateClick = () => {
    navigate(ownerUsersCreate);
  };

  const handleDeleteClick = async () => {
    console.log(`Deleting user with nickname "${nickname}"`);
    const responseJson = await restutils.deleteJson(
      `http://localhost:8080/owner_home/delete_user?username=${nickname}`, token)
    console.log(responseJson);
    navigate(ownerUsers);
  };

  const handleEditClick = () => {
    navigate(ownerUsersEdit);
  };

  const handleClearClick = () => {
    console.log('All fields cleared');
    setNickname('');
    setName('');
    setSurname('');
    setPassword('');
    setEmail('');
  };

  const handleShowAllClick = () => {
    console.log('Showing all users')
    // const fetchedUsers = await getUsers();
    // setUsers(fetchedUsers);
    setUsers(data.users.filter(user => user.role === "user"));
    setShowUsers(true);
  }
  
  const handleHideAllClick = () => {
    console.log('Hiding all users');
    setShowUsers(false);
  };


  return (
    <OwnerAppBar>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12}>
          {ContainedRectangleButton(
            showUsers ? 'Hide Users' : 'Show Users',
            showUsers ? handleHideAllClick : handleShowAllClick,
            {width: "400px"}
          )}
        </Grid>
        {showUsers && (
          <Grid item xs={12}>
            <Table>
              {placeTableHeader("Username", "Name", "Surname", "Email")}
              {placeUserTableBody(users)}
            </Table>
          </Grid>
        )}
        <HeaderGrid text="User Management"/>
        <Grid item xs={12}>
          {ContainedRectangleButton(
              "Create New User", 
              handleCreateClick, 
              {background: "green", color: "white", marginRight: oneRem}
            )
          }
          {ContainedRectangleButton( "Edit User", handleEditClick ) }
        </Grid>
        <Grid item xs={12}>
          {StandardTextField("Nickname", nickname, (e) => setNickname(e.target.value))}
          {LargeContainedRectangleButton("Search", handleSearchClick)}
        </Grid>
        <Grid item xs={12}>
          {HalfSizeButton("Clear", handleClearClick)}
          {RedHalfSizeButton("Delete This User?", handleDeleteClick)}
        </Grid>
        <MinorHeaderGrid text="Search Results:"/>
        {DisabledTextFieldGrid("Name", name, (e) => setName(e.target.value))}
        {DisabledTextFieldGrid("Surname", surname, (e) => setSurname(e.target.value))}
        {DisabledTextFieldGrid("Password", password, (e) => setPassword(e.target.value), "password")}
        {DisabledTextFieldGrid("Email", email, (e) => setPassword(e.target.value), "email")}
      </Grid>
    </OwnerAppBar>
  );
}
export default OwnerUsersPage;