import React, { useState } from 'react';
import { Grid } from '@mui/material';
import OwnerAppBar from '../components/OwnerAppBar';
import HeaderGrid from '../components/HeaderGrid';
import { backendAddress, ownerHome} from '../utils/pathutils';
import { post } from '../utils/restutils';
import { isInvalidUser } from '../utils/localutils';
import TextFieldGrid from '../components/TextFieldGrid';
import ContainedRectangleButton from '../components/ContainedRectangleButton';
import PasswordTextFieldGrid from '../components/PasswordTextFieldGrid';
import EmailTextFieldGrid from '../components/EmailTextFieldGrid';
import { oneRem } from '../theme';
// import useToken from '../hooks/useToken';

const OwnerUsersCreatePage = () => {
  // let [token, setToken] = useToken();

  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateClick = async () => {
    let userToCreate = {
      name: name,
      surname: surname,
      username: nickname,
      email: email,
      password: password,
      role: 'user',
    }
    if (isInvalidUser(userToCreate)){
      window.alert("At least one of the fields is empty");
    }
    else{
      console.log('User created');
      await post(backendAddress + ownerHome + '/create_user', JSON.stringify(userToCreate))
    };
  };

  const handleClearClick = () => {
    console.log('All fields cleared');
    setNickname('');
    setName('');
    setSurname('');
    setPassword('');
    setEmail('');
  };

  return (
    <OwnerAppBar>
      <Grid container spacing={2} justifyContent="flex-start">
        <HeaderGrid text="User Creation"/>
        <TextFieldGrid label="Nickname" value={nickname}  onChange={(e) => setNickname(e.target.value)}/>
        <TextFieldGrid label="Name"     value={name}      onChange={(e) => setName(e.target.value)}/>
        <TextFieldGrid label="Surname"  value={surname}   onChange={(e) => setSurname(e.target.value)}/>
        <PasswordTextFieldGrid value={password} onChange={(e) => setPassword(e.target.value)}/>
        <EmailTextFieldGrid value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Grid item xs={12}>
          {ContainedRectangleButton("Create New User", handleCreateClick,
          { marginRight: oneRem, background: "green" })}
          {ContainedRectangleButton("Clear", handleClearClick, 
          { width: "100px", marginRight: oneRem })}
        </Grid>
      </Grid>
    </OwnerAppBar>
  );
}
export default OwnerUsersCreatePage;
