import OwnerAppBar from '../components/OwnerAppBar';
import { useState } from "react";
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextFieldGrid from '../components/TextFieldGrid'
import ContainedRectangleButton from '../components/ContainedRectangleButton'
import { post } from '../utils/restutils'
import { backendAddress, ownerHome } from '../utils/pathutils'
import { oneRem, combined } from '../theme';
import HeaderGrid from '../components/HeaderGrid';
// import MyContext from '../contexts/MyContext';
// import useToken from '../hooks/useToken';

const OwnerDevicesPage = () => {
  // let data = useContext(MyContext);
  // let [token, setToken] = useToken();

  const [modelName, setModelName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [description, setDescription] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [ip, setIp] = useState('');
  const navigate = useNavigate();

  const handleCreateClick = async () => {
    let inverter_to_create = {
      userUsername: userUsername,
      description: description,
      modelName: modelName,
      login: login,
      password: parseInt(password),
      IP: ip,
    }
    if (!inverter_to_create.userUsername ||
      !inverter_to_create.description ||
      !inverter_to_create.modelName ||
      !inverter_to_create.login ||
      !inverter_to_create.password ||
      !inverter_to_create.IP) {
      window.alert("Please fill in all fields.");
    }
    else{
      console.log('Device created');
      // TODO zrobić coś z odpowiedzią
      await post(
        backendAddress + ownerHome + '/create_device', JSON.stringify(inverter_to_create))
    };
  };

  const handleClearClick = async () => {
    console.log("Clearing all fields");
    setLogin('');
    setModelName('');
    setUserUsername('');
    setDescription('');
    setPassword('');
    setIp('');
  }

  return (
    <OwnerAppBar>
      <Grid container spacing={2} justifyContent="flex-start">
        <HeaderGrid text={"Inverter Creation"}/>
        {TextFieldGrid(
          "Login", login, (e) => setLogin(e.target.value), 
          null, combined
          )
        }
        <TextFieldGrid label={"Model"} value={modelName} onChange={(e) => setModelName(e.target.value)}/>
        <TextFieldGrid label={"User"} value={userUsername} onChange={(e) => setUserUsername(e.target.value)}/>
        <TextFieldGrid label={"Description"} value={description} onChange={(e) => setDescription(e.target.value)} xs={{width: '600px'}}/>
        <TextFieldGrid label={"Password(has to be number)"} value={password} onChange={(e) => setPassword(e.target.value)} type={"number"}/>
        <TextFieldGrid label={"Ip address"} value={ip} onChange={(e) => setIp(e.target.value)}/>
        <Grid item xs={12}>
          {ContainedRectangleButton("Create New Inverter", handleCreateClick, {background: "green", marginRight: oneRem})}
          <Button
            sx={{ width: "100px", height: "50px",}}
            size="large"
            variant="text"
            onClick={handleClearClick}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </OwnerAppBar>
  );
}

export default OwnerDevicesPage;