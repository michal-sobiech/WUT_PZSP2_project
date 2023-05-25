import CustomizableAppBar from "./CustomizableAppBar";
// import { useNavigate } from 'react-router-dom'
// import { BrowserRouter } from "react-router-dom";


export default function OwnerAppBar({ children }) {

    let appBarButtonsData = [
        {name: 'Overview', url: '/owner_home/overview'},
        {name: 'Users', url: '/owner_home/users'},
        {name: 'Devices', url: '/owner_home/devices'},
        {name: 'Admins', url: '/owner_home/admins'},
    ]

    return (
        <CustomizableAppBar
        buttonsData={appBarButtonsData}>
        {children}
        </CustomizableAppBar>
    );
}