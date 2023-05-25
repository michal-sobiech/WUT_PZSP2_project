import React, { useState } from 'react';
import { Grid } from '@mui/material';
import OwnerAppBar from '../components/OwnerAppBar';
import useToken from '../hooks/useToken';
import { backendAddress, ownerHome, userHome } from '../utils/pathutils';
import HeaderGrid from '../components/HeaderGrid';
import { rightMargin } from '../theme' 
import * as restutils from '../utils/restutils'
import { isValidUser } from '../utils/localutils';
import StandardTextField from '../components/StandardTextField';
import TextFieldGrid from '../components/TextFieldGrid';
import LargeContainedRectangleButton from '../components/LargeContainedRectangleButton';
import { oneRem } from '../theme';
import PasswordTextFieldGrid from '../components/PasswordTextFieldGrid';
import EmailTextFieldGrid from '../components/EmailTextFieldGrid';


const OwnerUsersEditPage = () => {
  let [token, setToken] = useToken();
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSearchButton = async () => {
    console.log(`Searching for user with nickname "${nickname}"`);
    const responseJson = await restutils.getJson(
      backendAddress + ownerHome +`/get_user?username=${nickname}`, token
    );
    console.log(responseJson);
    handleResponse(responseJson);
  };

  const handleEditButton = async () => {
    let userToEdit = {
      name: name,
      surname: surname,
      username: nickname,
      email: email,
      password: password,
      role: 'user',
    }
    if (isValidUser(userToEdit)) {
      console.log('User created');
      // TODO tutaj response jest nieużywane
      await restutils.putWithBody(
        backendAddress + userHome + '/edit_user',
        token,
        JSON.stringify(userToEdit)
      );
    } else {
      window.alert("At least one of the fields is empty");
    };
  };

  const handleClearButton = () => {
    console.log('All fields cleared');
    clearAllFields();
  };

  const clearAllFields = () => {
    setNickname('');
    clearMainUserFields();
  }

  const clearMainUserFields = () => {
    setName('');
    setSurname('');
    setPassword('');
    setEmail('');
  }

  const handleResponse = (responseJson) => {
    if (responseJson.role === "user"){
      setName(responseJson.name);
      setSurname(responseJson.surname);
      setPassword(responseJson.password);
      setEmail(responseJson.email);
    }
    else {
      clearMainUserFields();
    }
  }

  return (
    <OwnerAppBar>
    <Grid container spacing={2} justifyContent="flex-start">
        <HeaderGrid text="User Management"/>
        <Grid item xs={12}>
          {StandardTextField("Nickname", nickname, (e) => setNickname(e.target.value))}
          {LargeContainedRectangleButton("Load", handleSearchButton)}
        </Grid>
        <TextFieldGrid label="Name" value={name} onChange={(e) => setName(e.target.value)} xs={rightMargin}/>
        <TextFieldGrid label="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} xs={rightMargin}/>
        <PasswordTextFieldGrid value={password} onChange={(e) => setPassword(e.target.value)} sx={rightMargin}/>
        <EmailTextFieldGrid value={email} onChange={(e) => setEmail(e.target.value)} sx={rightMargin}/>
        <Grid item xs={12}>
          {LargeContainedRectangleButton("Save", handleEditButton, { marginRight: oneRem })}
          {LargeContainedRectangleButton("Reset", handleEditButton, { marginRight: oneRem })}
          {LargeContainedRectangleButton("Clear", handleClearButton, { width: "100px", marginRight: oneRem })}
        </Grid>
    </Grid>
    </OwnerAppBar>
  );
}
export default OwnerUsersEditPage;