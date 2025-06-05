import { Navigate, Route, Routes } from "react-router-dom";
import * as RouthPath from "./config";
import { useSelector } from "react-redux";
import Auth from "../features/Auth";
import ErrorScreen from "../core/components/ErrorScreen";
import Onboarding from "../features/OnBoarding";
import UserDashboard from "../features/Dashboards/UserDashboard";
import AdminLoginScreen from "../features/AdminLogin";
import AdminLayout from "../core/components/Layouts/AdminLayout";
import InterestScreens from "../features/Dashboards/AdminDashboardScreen/Interests";
import AdminHomeScreen from "../features/Dashboards/AdminDashboardScreen/Home";

const AppRoutes = () => {
  const token = useSelector((state: any) => state.auth.token);

  return (
    <Routes>
      <Route path={RouthPath.ROOT} element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path={RouthPath.ERRORSCREEN} element={<ErrorScreen />} />
      <Route path={RouthPath.ADMINLOGIN} element={<AdminLoginScreen />} />
      {token && (
        <>
          <Route path={RouthPath.ONBOARDING} element={<Onboarding />} />
          <Route path={RouthPath.USERDASHBOARD} element={<UserDashboard/>} />
          <Route path={RouthPath.ADMINDASHBOARD} element={<AdminLayout/>} >
           <Route path="" element={<Navigate to={RouthPath.ADMINDASHBOARDHOME} replace />} />
          <Route path={RouthPath.ADMINDASHBOARDHOME} element={<AdminHomeScreen/>} />
          <Route path={RouthPath.INTERESTSRECIEVED} element={<InterestScreens/>} />
          </Route>
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
