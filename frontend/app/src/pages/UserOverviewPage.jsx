import { Button, Grid, FormLabel, Container } from '@mui/material';
import { CustomChart } from '../components/CustomChart';
import { ContentBox } from '../components/ContentBox';
import UserAppBar from './../components/UserAppBar';
import MyContext from './../contexts/MyContext';
import { useContext } from "react";
import { fixRecordTimes, getSumThenDiff } from '../ChartUtils';
import NamedList from '../components/NamedList';
import { useTheme } from '@emotion/react';
import BoldLabel from '../components/BoldLabel';


const UserOverviewPage = () => {
    let data = useContext(MyContext);
    const theme = useTheme();

    function TodaysBalanceBox() {
        let records = JSON.parse(JSON.stringify(data.records));

        let fixedDateRecords = fixRecordTimes(records);

        let preparedData = getSumThenDiff(
          fixedDateRecords,
          'generatedEnergy',
          'usedEnergy',
          'date'
        );

        let labels = Object.keys(preparedData);
        let shownData = labels.map(label => preparedData[label]);

        let chartData = {
          labels: labels,
          datasets: [{
            label: "Energy balance",
            data: shownData,
            backgroundColor: 'rgba(10, 10, 250, 1)'
          }]
        }
        return (
            <ContentBox
            backgroundColor={theme.lightSilver}>
                <Grid
                container>
                    <Grid
                    item
                    xs={12}
                    sx={{mx: 3, mt: 2}}>
                        <FormLabel>
                            {'Hello, ' + data.username + '!'}
                        </FormLabel>
                    </Grid>
                    <Grid
                    item
                    xs={12}>
                        <CustomChart
                        chartData={chartData}
                        width={500}
                        height={300}
                        chartType={'bar'}/>
                    </Grid>
                </Grid>
            </ContentBox> 
        );
    }
    
    function ConnectedDevicesBox() {
        let elements = [];
        for (let device of data.devices) {
            elements.push(
                <ContentBox
                backgroundColor={theme.silver}>
                    <Grid
                    container>
                        <Grid
                        item
                        xs={12}
                        sx={{ml: 2, mr: 2, mt: 2, mb: 0}}>
                            <FormLabel>
                                {'ID: ' + device.login}
                            </FormLabel>
                        </Grid>
                        <Grid
                        item
                        xs={12}
                        sx={{ml: 2, mr: 2, mt: 2, mb: 2}}>
                            <FormLabel>
                                {'Model: ' + device.modelName}
                            </FormLabel>
                        </Grid>
                    </Grid>     
                </ContentBox>
            );
        }
        return (
            <ContentBox
            backgroundColor={theme.lightSilver}>
                <Grid
                container>
                    <Grid
                    item
                    sx={{mx: 2, my: 2}}>
                        <NamedList name={'Connected devices'} elements={elements}/>
                    </Grid>
                </Grid>
            </ContentBox>
        );
    }
    
    function SavedMoneyBox() {
        return (
            <ContentBox
            backgroundColor={theme.lightSilver}>
                <Grid
                container>
                    <BoldLabel
                        sx={{mx: 3, my: 2}}>
                        Last month's earnings
                    </BoldLabel>
                </Grid>
            </ContentBox>
        );
    }
    
    function SavedCO2Box() {
        return (
            <ContentBox
            backgroundColor={theme.lightSilver}>
                <Grid
                container>
                    <BoldLabel 
                        sx={{mx: 3, my: 2}}>
                        CO2 saved
                    </BoldLabel>
                </Grid>
            </ContentBox>
        );
    }
    
    function SavingsBoxes() {
        return (
            <Grid
            container
            style={{
            width: '100%',
            height: '50%'}}>
                <Grid
                item
                xs={12}
                sx={{
                    width: '100%',
                    height: '100%'}}>
                    <SavedMoneyBox/>
                </Grid>
                <Grid
                item
                xs={12}
                sx={{
                width: '100%',
                height: '100%'}}>
                    <SavedCO2Box/>
                </Grid>
            </Grid>
        );
    }
    
    function LastTipsBox() {
        return (
            <ContentBox
            backgroundColor={theme.lightSilver}>
                <Grid
                container>
                    <BoldLabel
                    sx={{mx: 3, my: 2}}>
                    Last tips
                    </BoldLabel>
                </Grid>
            </ContentBox>
        );
    }
    
    function TodaysDateBox() {
        const currentTime = new Date();
        const formattedDate = currentTime.toLocaleDateString();

        return (
            <ContentBox
            backgroundColor={theme.lightSilver}>
                <Grid
                container>
                    <Grid
                    item
                    xs={12}
                    sx={{mx: 3, my: 2}}>
                        <BoldLabel>
                            Today is
                        </BoldLabel>
                    </Grid>
                    <Grid
                    item
                    xs={12}
                    sx={{mx: 3, mb: 2}}>
                        <BoldLabel>
                            {formattedDate}
                        </BoldLabel>
                    </Grid>
                </Grid>
            </ContentBox>
        );
    }

    return (
        <UserAppBar>
            <Grid
            container>
                <Grid
                    item
                    xs={4}>
                    <TodaysBalanceBox/>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <ConnectedDevicesBox/>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <SavingsBoxes/>
                </Grid>
                <Grid
                    item
                    xs={8}>
                    <LastTipsBox/>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <TodaysDateBox/>
                </Grid>
            </Grid>
        </UserAppBar>
    );
}

export default UserOverviewPage;