import { useNavigate } from "react-router-dom"


export const backendAddress = 'http://localhost:8080'

export const textRoot = "/";
export const logIn = makePath("", "log_in");
export const userHome = makePath("", "user_home");
export const adminHome = makePath("", "admin_home");
export const ownerHome = makePath("", "owner_home");
export const userOverview = makePath(userHome, "overview");
export const adminOverview = makePath(adminHome, "overview");
export const ownerOverview = makePath(ownerHome, "overview");
export const userAnalysis = makePath(userHome, "analysis");
export const userTipps = makePath(userHome, "tips");
export const userDevices = makePath(userHome, "devices");
export const ownerUsers = makePath(ownerHome, "users");
export const ownerUsersCreate = makePath(ownerHome, "users_create");
export const ownerUsersEdit = makePath(ownerHome, "users_edit");
export const ownerDevices = makePath(ownerHome, "devices");
export const ownerDevicesCreate = makePath(ownerHome, "devices_create");
export const ownerDevicesEdit = makePath(ownerHome, "devices_edit");
export const ownerAdmins = makePath(ownerHome, "admins");
export const ownerAdminsCreate = makePath(ownerHome, "admins_create");
export const ownerAdminsEdit = makePath(ownerHome, "admins_edit");

export function navigateToLogin() {
  let navigate = useNavigate;
  navigate(logIn);
}

export function makePath(...segments) {
  return segments.join("/");
}


export function pickOverviewPath(role) {
  return `/${role}_home/overview`
}

