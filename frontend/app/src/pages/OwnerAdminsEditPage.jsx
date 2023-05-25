import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import OwnerAppBar from '../components/OwnerAppBar';
import HeaderGrid from '../components/HeaderGrid';
import StandardTextField from '../components/StandardTextField';
import ContainedRectangleButton from '../components/ContainedRectangleButton';
import LargeContainedRectangleButton from '../components/LargeContainedRectangleButton';

const OwnerAdminsEditPage = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSearchClick = () => {
    console.log(`Searching for admin with nickname "${nickname}"`);
  };

  const handleEditClick = (field) => {
    console.log(`Editing "${field}" field for admin with nickname "${nickname}"`);
  };

  const handleClearClick = () => {
    console.log('All fields cleared');
    setNickname('');
    setName('');
    setSurname('');
    setPassword('');
    setEmail('');
  };
  
  const textFieldSx = { marginRight: "1rem" } 
  const buttonSx = { width: "200px", height: "50px" }  
  return (
    <OwnerAppBar>
    <Grid container spacing={2} justifyContent="flex-start">
      <HeaderGrid text="Admin Management"/>
      <Grid item xs={12}>
          {StandardTextField("Nickname", nickname, (e) => setNickname(e.target.value))}
          {LargeContainedRectangleButton("Load", handleSearchClick)}
      </Grid>
      <Grid item xs={12}>
          {StandardTextField("Name", name, (e) => setName(e.target.value))}
          {LargeContainedRectangleButton("Edit Name", () => handleEditClick('name'))}
      </Grid>
      <Grid item xs={12}>
          {StandardTextField("Surname", surname, (e) => setSurname(e.target.value))}
          {LargeContainedRectangleButton("Edit Surname", () => handleEditClick('surname'))}
      </Grid>
      <Grid item xs={12}>
          {StandardTextField("Password", password, (e) => setPassword(e.target.value), "password")}
          {LargeContainedRectangleButton("Edit Password", () => handleEditClick('password'))}
      </Grid>
      <Grid item xs={12}>
          {StandardTextField("Email", email, (e) => setEmail(e.target.value), "email")}
          {LargeContainedRectangleButton("Edit Email", () => handleEditClick('email'))}
      </Grid>
      <Grid item xs={12}>
          {LargeContainedRectangleButton("Clear", handleClearClick)}
      </Grid>
    </Grid>
    </OwnerAppBar>
  );
}

export default OwnerAdminsEditPage;
