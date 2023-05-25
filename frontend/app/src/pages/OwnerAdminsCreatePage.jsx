import React, { useState } from 'react';
import {
  Grid,
  Button,
} from '@mui/material';
import OwnerAppBar from '../components/OwnerAppBar';
import HeaderGrid from '../components/HeaderGrid';
import TextFieldGrid from '../components/TextFieldGrid';
import ContainedRectangleButton from '../components/ContainedRectangleButton';
import LargeContainedRectangleButton from '../components/LargeContainedRectangleButton';
import { oneRem } from '../theme';
import PasswordTextFieldGrid from '../components/PasswordTextFieldGrid';
import EmailTextFieldGrid from '../components/EmailTextFieldGrid';


const OwnerAdminsCreatePage = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateButton = () => {
    console.log('Admin created');
  };

  const handleClearButton = () => {
    console.log('All fields cleared');
    setNickname('');
    clearAdminFields();
  };

  const clearAdminFields = () => {
    setName('');
    setSurname('');
    setPassword('');
    setEmail('');
  };

  return (
    <OwnerAppBar>
      <Grid container spacing={2} justifyContent="flex-start">
        <HeaderGrid text="Admin Creation"/>
        <TextFieldGrid label="Nickname" value={nickname}  onChange={(e) => setNickname(e.target.value)}/>
        <TextFieldGrid label="Name"     value={name}      onChange={(e) => setName(e.target.value)}/>
        <TextFieldGrid label="Surname"  value={surname}   onChange={(e) => setSurname(e.target.value)}/>
        <PasswordTextFieldGrid value={password} onChange={(e) => setPassword(e.target.value)}/>
        <EmailTextFieldGrid value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Grid item xs={12}>
          {ContainedRectangleButton(
              "Create New Admin", 
              handleCreateButton, 
              {background: "green", color: "white", marginRight: oneRem}
            )
          }
          {LargeContainedRectangleButton(
              "Clear", 
              handleCreateButton,
              { width: "100px" }
            )
          }
        </Grid>
      </Grid>
    </OwnerAppBar>
  );
}
export default OwnerAdminsCreatePage;