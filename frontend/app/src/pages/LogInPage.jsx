import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/system';
import { Box, Grid, Toolbar } from '@mui/material';
import { useState } from 'react';
import useToken from '../hooks/useToken';
import { 
  SimpleAppBar, 
  CentredTextFieldGrid,
  CentredPasswordFieldGrid,
  CenteredFormLabelGrid,
  CentredButtonGrid
} from  '../utils/placementutils';
import { buttonColorStyle } from "../theme"
import {backendAddress, logIn} from "../utils/pathutils"
import * as restutils from "../utils/restutils"

const LogInPage = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [token, setToken] = useToken();

  async function handleLogInButtonClick() {
    console.log('Trying to log in');
    let responseJson = await postLoginData(email, password);
    // removeCookie('JWT_token');
    handleLogInResponse(responseJson);
  }

  function pickOverviewPath(role) {
    return `/${role}_home/overview`
  }

  async function postLoginData(email, password) {
    const responseJson = await restutils.postJson(
      backendAddress + logIn,
      JSON.stringify({
        'username': email,
        'password': password
      })
    )
    return responseJson;
    // TODO
  }

  function handleLogInResponse(responseJson) {
    if (responseJson.status === 'success') {
      logSuccess(responseJson);
      handleSuccess(responseJson);
    } else {
      logFailure();
    }
  }

  function handleSuccess(responseJson) {
    setToken(responseJson.token);
    let url = pickOverviewPath(responseJson.role);
    navigate(url);
  }

  function logSuccess(responseJson) {
    console.log('Logged in');
    console.log('Role: ' + responseJson.role);
  }

  function logFailure() {
    console.log('Failed to log in');
  }

  function handleEmailTextFieldChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordTextFieldChange(event) {
    setPassword(event.target.value);
  }

  return (
    <Container>
      <SimpleAppBar/>
      <Toolbar/>
      <Box>                           
        <Grid
        container
        spacing={2}>
          {CentredTextFieldGrid("Username", email, handleEmailTextFieldChange)}
          {CentredPasswordFieldGrid(password, handlePasswordTextFieldChange)}
          {CentredButtonGrid(buttonColorStyle, handleLogInButtonClick, "Log in")}
          {CenteredFormLabelGrid("Not a member yet?")}
          {CenteredFormLabelGrid("Contact us at proman@gmail.com to sign up!")}
        </Grid> 
      </Box>
    </Container>
  );
}
export default LogInPage;
