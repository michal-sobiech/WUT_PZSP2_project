import { useContext } from "react";
import MyContext from '../contexts/MyContext';
import OwnerAppBar from './../components/OwnerAppBar';
import { Typography } from "@mui/material";

const OwnerOverviewPage = () => {
    let data = useContext(MyContext);

    return (
        <OwnerAppBar>
            <Typography variant="h1" sx={{ fontWeight: "bold", color: "silver" }}>
                Welcome owner {data.username}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "silver" }}>
                To navigate select icons on the bar above
            </Typography>
        </OwnerAppBar>
    );
}

export default OwnerOverviewPage;