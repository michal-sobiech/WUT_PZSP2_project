import { ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';
import UserOverviewPage from './pages/UserOverviewPage';
import UserAnalysisPage from './pages/UserAnalysisPage';
import UserTipsPage from './pages/UserTipsPage';
import UserDevicesPage from './pages/UserDevicesPage';
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import AdminOverviewPage from './pages/AdminOverviewPage';
import OwnerOverviewPage from './pages/OwnerOverviewPage';
import OwnerUsersPage from './pages/OwnerUsersPage';
import OwnerUsersCreatePage from './pages/OwnerUsersCreatePage';
import OwnerUsersEditPage from './pages/OwnerUsersEditPage';
import OwnerDevicesPage from './pages/OwnerDevicesPage';
import OwnerDevicesCreatePage from './pages/OwnerDevicesCreatePage';
import OwnerDevicesEditPage from './pages/OwnerDevicesEditPage';
import OwnerAdminsPage from './pages/OwnerAdminsPage';
import OwnerAdminsCreatePage from './pages/OwnerAdminsCreatePage'
import OwnerAdminsEditPage from './pages/OwnerAdminsEditPage';
import AdminInverterCreatePage from './pages/AdminInverterCreatePage';
import AdminInvertersPage from './pages/AdminInvertersPage';
import RouteCreator from './RouteCreator'
import { theme } from './theme'
import { 
  textRoot, 
  logIn, 
  userOverview, 
  adminOverview, 
  ownerOverview, 
  userAnalysis, 
  userTipps, 
  userDevices, 
  ownerUsers, 
  ownerUsersCreate, 
  ownerUsersEdit, 
  ownerDevices, 
  ownerDevicesCreate, 
  ownerDevicesEdit, 
  ownerAdmins, 
  ownerAdminsCreate, 
  ownerAdminsEdit, 
  backendAddress
} from './utils/pathutils'



let routeCreator = new RouteCreator(
  backendAddress,
  <Navigate to={logIn}/>
)

const router = createBrowserRouter(
  [{
    path: textRoot,
    element: (
      <ThemeProvider theme={theme}>
        <Outlet/>
      </ThemeProvider>
    ),
    children: [
      routeCreator.createRoute(textRoot, <Navigate to={logIn}/>),
      routeCreator.createRoute(logIn, <LogInPage/>),
      routeCreator.createProtectedRoute(userOverview, <UserOverviewPage/>),
      routeCreator.createProtectedRoute(userAnalysis, <UserAnalysisPage/>),
      routeCreator.createProtectedRoute(userTipps, <UserTipsPage/>),
      routeCreator.createProtectedRoute(userDevices, <UserDevicesPage/>),
      routeCreator.createProtectedRoute(adminOverview, <AdminOverviewPage/>),
      routeCreator.createProtectedRoute(ownerOverview, <OwnerOverviewPage/>),
      routeCreator.createProtectedRoute(ownerUsers, <OwnerUsersPage/>),
      routeCreator.createProtectedRoute(ownerUsersCreate, <OwnerUsersCreatePage/>),
      routeCreator.createProtectedRoute(ownerUsersEdit, <OwnerUsersEditPage/>),
      routeCreator.createProtectedRoute(ownerDevices, <OwnerDevicesPage/>),
      routeCreator.createProtectedRoute(ownerDevicesCreate, <OwnerDevicesCreatePage/>),
      routeCreator.createProtectedRoute(ownerDevicesEdit, <OwnerDevicesEditPage/>),
      routeCreator.createProtectedRoute(ownerAdmins, <OwnerAdminsPage/>),
      routeCreator.createProtectedRoute(ownerAdminsCreate, <OwnerAdminsCreatePage/>),
      routeCreator.createProtectedRoute(ownerAdminsEdit, <OwnerAdminsEditPage/>)
    ]
  }]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);
