import React, { useState } from 'react';
import { Grid, } from '@mui/material';
import OwnerAppBar from '../components/OwnerAppBar';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import MyContext from '../contexts/MyContext';
import ContainedRectangleButton from '../components/ContainedRectangleButton';
import HalfSizeButton from '../components/HalfSizeButton';
import RedHalfSizeButton from '../components/RedHalfSizeButton';
import StandardTextField from '../components/StandardTextField';
import { oneRem } from '../theme';
import DisabledTextFieldGrid from '../components/DisabledTextFieldGrid'
import HeaderGrid from '../components/HeaderGrid'
import MinorHeaderGrid from '../components/MinorHeaderGrid'

const OwnerAdminsPage = () => {
  let data = useContext(MyContext);


  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [admins, setAdmins] = useState([]);
  const [showAdmins, setShowAdmins] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    console.log(`Searching for admin with nickname "${nickname}"`);
  };

  const handleCreateClick = () => {
    navigate('/owner_home/admins_create')
  };

  const handleDeleteClick = () => {
    console.log(`Deleting admin with nickname "${nickname}"`);
  };

  const handleEditClick = () => {
    navigate('/owner_home/admins_edit')
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
    console.log('Showing all admins')
    // const fetchedAdmins = await getAdmins();
    // setAdmins(fetchedAdmins);
    setAdmins(data.users.filter(user => user.role === "admin"));
    setShowAdmins(true);
  }
  
  const handleHideAllClick = () => {
    console.log('Hiding all admins');
    setShowAdmins(false);
  };
  const standardXs = 12;
  return (
    <OwnerAppBar>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={standardXs}>
          {ContainedRectangleButton(
            showAdmins ? 'Hide Admins' : 'Show Admins',
            showAdmins ? handleHideAllClick : handleShowAllClick,
            {width: "400px", height: "50px"}
          )}
        </Grid>
        {showAdmins && admins.map((admin) => (
          <Grid item key={admin.id} xs={12}>
            <div>
              <p>Username: {admin.username}</p>
              <p>Name: {admin.name}</p>
              <p>Surname: {admin.surname}</p>
              <p>Email: {admin.email}</p>
              <p>Phone: {admin.phone}</p>
            </div>
          </Grid>
        ))}
        <HeaderGrid text="Admin Management"/>
        <Grid item xs={standardXs}>
          {ContainedRectangleButton(
            "Create New Admin", handleCreateClick, {background: "green", color: "white", marginRight: oneRem})}
          {ContainedRectangleButton("Edit Admin", handleEditClick)}
        </Grid>
        <Grid item xs={standardXs}>
          {StandardTextField("Nickname", nickname, (e) => setNickname(e.target.value))}
          {ContainedRectangleButton("Search", handleSearchClick)}
        </Grid>
        <Grid item xs={standardXs}>
          {HalfSizeButton("Clear", handleClearClick)}
          {RedHalfSizeButton("Delete This Admin?", handleDeleteClick)}
        </Grid>
        <MinorHeaderGrid text="Search Results:"/>
        {DisabledTextFieldGrid("Name", name, (e) => setName(e.target.value))}
        {DisabledTextFieldGrid("Surname", surname, (e) => setSurname(e.target.value))}
        {DisabledTextFieldGrid("Password", password, (e) => setPassword(e.target.value), "password")}
        {DisabledTextFieldGrid("Email", email, (e) => setEmail(e.target.value), "email")}
      </Grid>
    </OwnerAppBar>
  );
}
export default OwnerAdminsPage;