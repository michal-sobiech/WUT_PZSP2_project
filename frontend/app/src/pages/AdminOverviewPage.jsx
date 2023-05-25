import { useContext } from "react";
import MyContext from '../contexts/MyContext';
import AdminNavigationBar from './../components/AdminNavigationBar';

export default function AdminOverviewPage() {
    let data = useContext(MyContext);

    return (
        <AdminNavigationBar>
            <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", color: "grey" }}>Welcome {data.name}!</h1>
        </AdminNavigationBar>
    );
}
