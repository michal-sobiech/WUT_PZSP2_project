import { halfWidthRectangle } from "../theme" 
import { Button, } from '@mui/material';


export default function HalfSizeButton(label, onClick) {
  return (
    <Button
      sx={halfWidthRectangle}
      size="large"
      variant="text"
      onClick={onClick}
      >
      {label}
    </Button>
  )
}
