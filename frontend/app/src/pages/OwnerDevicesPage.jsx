import OwnerAppBar from '../components/OwnerAppBar';
import MyContext from '../contexts/MyContext';
import { useContext, useState } from "react";
import useToken from '../hooks/useToken';
import { Button, Table } from '@mui/material';
import { useEffect } from 'react';
import { Grid, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getJson } from '../utils/restutils' 
import { oneRem } from '../theme' 
import { backendAddress, ownerDevicesCreate, ownerDevicesEdit, ownerHome } from '../utils/pathutils' 
import { placeInverterTableBody, placeTableHeader} from '../utils/placementutils';
import HeaderGrid from '../components/HeaderGrid';
import MinorHeaderGrid from '../components/MinorHeaderGrid';
import ContainedRectangleButton from '../components/ContainedRectangleButton';
import DisabledTextFieldGrid from '../components/DisabledTextFieldGrid';
import StandardTextField from '../components/StandardTextField';
import HalfSizeButton from '../components/HalfSizeButton';
import RedHalfSizeButton from '../components/RedHalfSizeButton';


const OwnerDevicesPage = () => {
  let data = useContext(MyContext);
  let [token, setToken] = useToken();

  const [modelName, setModelName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [description, setDescription] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [ip, setIp] = useState('');
  const [showInverters, setShowInverters] = useState(false);
  const navigate = useNavigate();
  const [inverters, setInverters] = useState([]);
  
  useEffect(() => {
      setInverters(data.userInverters);
    }, [data.userInverters]);


  const handleCreateClick = async () => {
    navigate(ownerDevicesCreate);
  }

  const handleSearchClick = async () => {
    console.log(`Searching for inverter with login "${login}"`);
    const responseJson = await getJson(
      backendAddress + ownerHome + `/get_device?login=${login}`, token
    );
    console.log(responseJson);
    if (responseJson){
      setModelName(responseJson.modelName);
      setUserUsername(responseJson.userUsername);
      setDescription(responseJson.description);
      setPassword(responseJson.password);
      setIp(responseJson.ip);
    }
    else {
      clearDeviceFields();
    }
  };

  const handleClearClick = async () => {
    setLogin('');
    clearDeviceFields();
  }

  const clearDeviceFields = async () => {
    setModelName('');
    setUserUsername('');
    setDescription('');
    setPassword('');
    setIp('');
  }

  const handleDeleteClick = async () => {
    console.log("Click");
  }

  const handleEditClick = async () => {
    navigate(ownerDevicesEdit);
  }

  const handleShowAllClick = () => {
    console.log('Showing all users')
    // const fetchedUsers = await getUsers();
    // setUsers(fetchedUsers);
    setShowInverters(true);
  }
  
  const handleHideAllClick = () => {
    console.log('Hiding all users');
    setShowInverters(false);
  };

  return (
    <OwnerAppBar>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12}>
          <Button variant="contained"
          onClick={showInverters ? handleHideAllClick : handleShowAllClick}
          sx={{width: "400px", height: "50px"}}
          >
          {showInverters ? 'Hide Inverters' : 'Show Inverters'}
          </Button>
        </Grid>
        {showInverters && (
          <Grid item xs={12}>
          <Table>
            {placeTableHeader("Model", "User", "Description", "Login", "Password", "Ip address")}
            {placeInverterTableBody(inverters)}
          </Table>
          </Grid>
        )}
        <HeaderGrid text="Inverter Management"/>
        <Grid item xs={12}>
          {ContainedRectangleButton(
              "Create New Inverter", 
              handleCreateClick, 
              {background: "green", color: "white", marginRight: oneRem}
            )
          }
          {ContainedRectangleButton( "Edit Inverter", handleEditClick)}
        </Grid>
        <Grid item xs={12}>
          {StandardTextField("Login", login, (e) => setLogin(e.target.value))}
          {ContainedRectangleButton("Search", handleSearchClick)}
        </Grid>
        <Grid item xs={12}>
          {HalfSizeButton("Clear", handleClearClick)}
          {RedHalfSizeButton("Delete This Inverter?", handleDeleteClick)}
        </Grid>
        <MinorHeaderGrid text="Search Results:"/>
        {DisabledTextFieldGrid("Model", modelName, (e) => setModelName(e.target.value))}
        {DisabledTextFieldGrid("User", userUsername, (e) => setUserUsername(e.target.value))}
        {DisabledTextFieldGrid(
          "Description", description, (e) => setDescription(e.target.value),
          null, {width: '600px'}
        )}
        {DisabledTextFieldGrid("Password", password, (e) => setPassword(e.target.value), "password")}
        {DisabledTextFieldGrid("Ip Address", ip, (e) => setIp(e.target.value))}
      </Grid>
    </OwnerAppBar>
  );
}
export default OwnerDevicesPage;
