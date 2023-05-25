import OwnerAppBar from '../components/OwnerAppBar';
import MyContext from '../contexts/MyContext';
import { useContext, useState } from "react";
import { useEffect } from 'react';
import { Grid, TextField, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeaderGrid from '../components/HeaderGrid'
import StandardTextField from '../components/StandardTextField';
import TextFieldGrid from '../components/TextFieldGrid';
import ContainedRectangleButton from '../components/ContainedRectangleButton';
import { oneRem } from '../theme';
// import useToken from '../hooks/useToken';

const OwnerDevicesPage = () => {
    let data = useContext(MyContext);
    // let [token, setToken] = useToken();

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
      navigate('/owner_home/devices_create')
    }

    const handleSearchClick = async () => {
      console.log("Click");
    }

    const handleClearClick = async () => {
      console.log("Clearing all fields");
      setLogin('');
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
      navigate('/owner_home/devices_edit')
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
          <HeaderGrid text="Inverter Edition"/>
          <Grid item xs={12}>
            {StandardTextField("Login", login, (e) => setLogin(e.target.value))}
            {ContainedRectangleButton("Load", handleSearchClick)}
          </Grid>
          {TextFieldGrid("Model", modelName, (e) => setModelName(e.target.value))}
          {TextFieldGrid("User", userUsername, (e) => setUserUsername(e.target.value))}
          {TextFieldGrid(
            "Description", description, (e) => setDescription(e.target.value),
            null, {width: '600px'}
          )}
          {TextFieldGrid("Password", password, (e) => setPassword(e.target.value),)}
          {TextFieldGrid("Ip Address", ip, (e) => setIp(e.target.value))}
          <Grid item xs={12}>
            {ContainedRectangleButton("Save", handleCreateClick, { marginRight: oneRem })}
            {ContainedRectangleButton("Reset", handleSearchClick, { marginRight: oneRem })}
            {ContainedRectangleButton("Clear", handleClearClick, { width: "100px", marginRight: oneRem })}
          </Grid>
        </Grid>
      </OwnerAppBar>
    );
  }
export default OwnerDevicesPage;