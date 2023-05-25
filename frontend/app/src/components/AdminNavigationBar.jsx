import CustomizableAppBar from "./CustomizableAppBar";


export default function OwnerAppBar({ children }) {

    let appBarButtonsData = [
        {name: 'Overview', url: '/admin_home/overview'},
        {name: 'Users', url: '/admin_home/users'},
        {name: 'Inverters', url: '/admin_home/inverters'}
    ]

    return (
        <CustomizableAppBar buttonsData={appBarButtonsData}>
        {children}
        </CustomizableAppBar>
    );
}
