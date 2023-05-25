import NamedList from './../components/NamedList';
import UserAppBar from '../components/UserAppBar';
import { useContext, useState } from 'react';
import MyContext from '../contexts/MyContext';
import { useTheme } from '@emotion/react';
import Tip from '../components/Tip';
import { TextField, Grid, FormLabel, Button } from '@mui/material';
import { ContentBox } from '../components/ContentBox';
import BoldLabel from '../components/BoldLabel';


const UserTipsPage = () => {
  let data = useContext(MyContext);
  let theme = useTheme();

  const maxHour = 24;
  const minHour = 1;
  const minEnergyUsage = 0;
  const maxEnergyUsage = 9999;

  const TipsList = () => { 
    let elems = []
    for (let dataSet of data.tips) {
      elems.push(
        Tip(dataSet.name, dataSet.description)
      );
    }
    return (
      <NamedList name={'Tips'} elements={elems}/>
    );
  }
  
  const ParameterSettingsPanel = () => {
    let [highEnergyUsage, setHighEnergyUsage] = useState();
    let [nightStart, setNightStart] = useState();
    let [nightEnd, setNightEnd] = useState();

    const handleNightStartBlur = () => {
      let newVal = highEnergyUsage;

      newVal = Math.min(newVal, maxHour);
      newVal = Math.max(newVal, minHour);
      newVal = Math.floor(newVal);

      setNightStart(newVal);
    }

    const handleNightStartChange = (event) => {
      setNightStart(event.target.value);
    }
  
    const handleNightEndBlur = () => {
      let newVal = highEnergyUsage;

      newVal = Math.min(newVal, maxHour);
      newVal = Math.max(newVal, minHour);
      newVal = Math.floor(newVal);

      setNightEnd(newVal);
    }

    const handleNightEndChange = (event) => {
      setNightEnd(event.target.value);
    }
  
    const handleHighEnergyUsageBlur = () => {
      let newVal = highEnergyUsage;

      newVal = Math.min(newVal, maxEnergyUsage);
      newVal = Math.max(newVal, minEnergyUsage);
      newVal = Math.round(newVal * 100) / 100;

      setHighEnergyUsage(newVal);
    }

    const handleHighEnergyUsageChange = (event) => {
      setHighEnergyUsage(event.target.value);
    }

    let nightStartElem = (
      <Grid
      container
      sx={{m:1}}>
        <Grid
        item
        sx={{mb:1}}
        xs={12}>
          <FormLabel>
            Night start
          </FormLabel>
        </Grid>
        <Grid
        item
        xs={12}>
          <TextField
          type='number'
          value={nightStart}
          onChange={handleNightStartChange}
          onBlur={handleNightStartBlur}
          fullWidth
          inputProps={{
          min: 1,
          max: 24,
          step: 1, 
          }}
          />
        </Grid>
      </Grid>
    );

    let nightEndElem = (
      <Grid
      container
      sx={{m:1}}>
        <Grid
        item
        xs={12}
        sx={{mb:1}}>
          <FormLabel>
            Night end
          </FormLabel>
        </Grid>
        <Grid
        item
        xs={12}>
          <TextField
          type='number'
          value={nightEnd}
          onChange={handleNightEndChange}
          onBlur={handleNightEndBlur}
          fullWidth
          inputProps={{
          min: 1,
          max: 24,
          step: 1, 
          }}
          />
        </Grid>
      </Grid>
    );

    let nightTimeFields = (
      <Grid 
      container>
        <Grid
        item
        container
        xs={6}>
          {nightStartElem}
        </Grid>
        <Grid
        item
        container
        xs={6}>
          {nightEndElem}
        </Grid>
      </Grid>
    );

    let highEnergyUsageElem = (
      <Grid
      container>
        <Grid
        container
        sx={{m:1}}>
          <Grid
          item
          xs={12}
          sx={{mb:1}}>
            <FormLabel>
              Daily energy usage that will generate an alarm [kWH]
            </FormLabel>
          </Grid>
          <Grid
          item
          xs={12}>
            <TextField
            type='number'
            value={highEnergyUsage}
            onChange={handleHighEnergyUsageChange}
            onBlur={handleHighEnergyUsageBlur}
            fullWidth
            inputProps={{
            min: 0,
            max: 9999,
            step: 1, 
            }}
            />
          </Grid>
        </Grid>
      </Grid>
    );

    return (
      <Grid
      container>
        <ContentBox
        backgroundColor={theme.lightSilver}>
          <Grid
          container
          direction='column'>
            <Grid
            item
            sx={{ml:3, mr:3, mt: 3, mb: 1}}>
              <BoldLabel>
                Settings
              </BoldLabel>
            </Grid>
            <Grid
            item
            sx={{ml:3, mb:1, mr:3}}>
              {highEnergyUsageElem}
            </Grid>
            <Grid
            item
            sx={{ml:3, mb:3, mr:3}}>
              {nightTimeFields}
            </Grid>
            <Grid
            item>
              <Grid
              container>
                <Button
                fullWidth
                sx={{
                ml:3,
                mb:3,
                mr:3,
                backgroundColor:theme.white
                }}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </ContentBox>
      </Grid>
    );
  }

  return (
    <UserAppBar>
      <Grid
      container
      sx={{m:3}}>
        <Grid
        xs={4}>
          <ParameterSettingsPanel/>
        </Grid>
        <Grid
        xs={8}>
          <TipsList/>
        </Grid>
      </Grid>
    </UserAppBar>
  );
}

export default UserTipsPage;