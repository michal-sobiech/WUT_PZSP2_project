
import { Grid, FormLabel, FormControl, FormControlLabel, Radio, RadioGroup} from '@mui/material';


export default function RadioFormControlLabel({value, label}) {
  return (
    <FormControlLabel value={value} control={<Radio/>} label={label}/>
  );
}


