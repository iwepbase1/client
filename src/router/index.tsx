import { Navigate, Route, Routes } from "react-router-dom";
import * as RouthPath from "./config";
import { useSelector } from "react-redux";
import Auth from "../features/Auth";
import ErrorScreen from "../core/components/ErrorScreen";
import Onboarding from "../features/OnBoarding";
import UserDashboard from "../features/Dashboards/UserDashboard";

const AppRoutes = () => {
  const token = useSelector((state: any) => state.auth.token);

  return (
    <Routes>
      <Route path={RouthPath.ROOT} element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path={RouthPath.ERRORSCREEN} element={<ErrorScreen />} />
      {token && (
        <>
          <Route path={RouthPath.ONBOARDING} element={<Onboarding />} />
          <Route path={RouthPath.USERDASHBOARD} element={<UserDashboard/>} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
