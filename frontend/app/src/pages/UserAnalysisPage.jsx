import { Grid, FormLabel, FormControl, RadioGroup} from '@mui/material';
import { CustomChart } from '../components/CustomChart';
import { ContentBox } from '../components/ContentBox';
import UserAppBar from '../components/UserAppBar';
import { useContext, useEffect, useState } from "react";
import MyContext from '../contexts/MyContext';
import { getSum, getAverage, getSumThenDiff, fixRecordTimes } from '../ChartUtils';
import { useTheme } from '@emotion/react';
import RadioFormControlLabel from '../components/RadioFormControlLabel';
import InverterADataDO from '../data_objects/InverterADataDO';


// const testData = {
//     labels: ['9:00', '10:00', '11:00'],
//     datasets: [
//         {
//             label: 'Savings',
//             data: [100, 200, 300],
//             backgroundColor: 'rgba(0, 200, 20, 1)'
//         },
//         {
//             label: 'Spendings',
//             data: [200, 300, 100],
//             backgroundColor: 'rgba(200, 10, 10, 1)'
//         },
//     ]
// }

const UserAnalysisPage = () => {
  let [chartType, setChartType] = useState('bar');
  let [chartDataType, setChartDataType] = useState('Idc');
  let theme = useTheme();

  function chooseChartDataType(chartDataType) {
    switch (chartDataType) {
      case 'Idc':
        return ['Avg. current [A]', getAverage];
      case 'Udc1':
        return ['Avg. voltage [V]', getAverage];
      // case 'generatedEnergy':
      //   return ['Generated Energy [kWh]', getSum];
      // case 'usedEnergy':
      //   return ['Used Energy [kWh]', getSum];
      // case 'energyBalance':
      //   return ['Energy balance [kWh]', getSumThenDiff];
      case 'generatorRotation':
        return ["Generator's rotations [1/min]", getSum];
      default:
        return;
    }
  }

  function ChartBox() {
    let data = useContext(MyContext);

    let records = JSON.parse(JSON.stringify(data.records));

    let fixedDateRecords = fixRecordTimes(records);

    let [label, groupingFunction] = chooseChartDataType(chartDataType);

    let preparedData;   // dict of values (Y axis) mapped to dates (X)
    if (groupingFunction === getSumThenDiff) {
      preparedData = getSumThenDiff(
        fixedDateRecords,
        'generatedEnergy',
        'usedEnergy',
      );
    } else {
      preparedData = groupingFunction(
        fixedDateRecords,
        chartDataType,
      );
    }        

    let X = Object.keys(preparedData);
    let Y = X.map(x => preparedData[x]);

    let chartData = {
      labels: X,
      datasets: [{
        label: label,
        data: Y,
        //backgroundColor: 'rgba(10, 10, 250, 1)'
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
                Chart
            </FormLabel>
          </Grid>
          <Grid
          item
          xs={12}
          sx={{mx: 3, mt: 2}}>
            <CustomChart
            chartData={chartData}
            width={800}
            height={500}
            chartType={chartType}/>
          </Grid>
        </Grid>
      </ContentBox>
    );
}

function ChartOptionsBox() {
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
                Chart
            </FormLabel>
          </Grid>
          <Grid
          item
          xs={12}>
            <ChartDataSelectionButtons/>
          </Grid>
          <Grid
          item
          xs={12}>
            <ChartTypeSelectionButtons/>
          </Grid>
        </Grid>
      </ContentBox>
    );
  }

  function ChartDataSelectionButtons() {

    function handleChange(event) {
      setChartDataType(event.target.value);
    }

    return (
      <FormControl
      sx={{m:3}}>
        <FormLabel
          id='chart_data_selection'>
          Parameter
        </FormLabel>
        <RadioGroup
          aria-labelledby='chart_data_label'
          defaultValue={chartDataType}
          name='chart_data_buttons_group'
          onChange={handleChange}>
          {RadioFormControlLabel({value: 'Idc', label: 'Current'})}
          {RadioFormControlLabel({value: 'Udc1', label: 'Voltage'})}
          {/* {RadioFormControlLabel({value: 'generatedEnergy', label: 'Generated Energy'})}
          {RadioFormControlLabel({value: 'usedEnergy', label: 'Used Energy'})} */}
          {RadioFormControlLabel({value: 'generatorRotation', label: 'Generator rotation'})}
          {/* {RadioFormControlLabel({value: 'energyBalance', label: 'Energy Balance'})} */}
        </RadioGroup>
      </FormControl>
    );
  }

  function ChartTypeSelectionButtons() {
    function handleChange(event) {
        setChartType(event.target.value);
    }

    return (
      <FormControl
      sx={{m:3}}>
        <FormLabel
          id='chart_type_selection'>
          Chart type
        </FormLabel>
        <RadioGroup
          aria-labelledby='chart_type_label'
          defaultValue={chartType}
          name='chart_type_buttons_group'
          onChange={handleChange}>
          {RadioFormControlLabel({value: 'bar', label: 'Bar'})}
          {RadioFormControlLabel({value: 'line', label: 'Line'})}
          {/* {RadioFormControlLabel({value: 'pie', label: 'Pie'})} */}
        </RadioGroup>
      </FormControl>
    );
  }

  return (
      <UserAppBar>
          <Grid
          container>
              <Grid
              item
              xs={7}>
                  <ChartBox/>
              </Grid>
              <Grid
              item
              xs={5}>
                  <ChartOptionsBox/>
              </Grid>
          </Grid>
      </UserAppBar>
  )
}
export default UserAnalysisPage;
