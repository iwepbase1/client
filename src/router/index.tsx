import { Navigate, Route, Routes } from "react-router-dom";
import * as RouthPath from "./config";
import { useSelector } from "react-redux";

// import LandingPage from "../features/Auth/LandingPage";
// import ErrorScreen from "../core/components/ErrorScreen";

const AppRoutes = () => {
  const token = useSelector((state: any) => state.auth.token);

  return (
    <Routes>
      {/* <Route path={RouthPath.ROOT} element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path={RouthPath.ERRORSCREEN} element={<ErrorScreen/>} /> */}
      {token && (
        <>
            {/* <Route path={RouthPath.CHANGEPASSWORD} element={<ChangePasswordScreen />} />
            <Route path={RouthPath.DASHBOARD} element={<AdminLayout />} >
            <Route path="" element={<Navigate to={RouthPath.HOME} replace />} />
            <Route path={RouthPath.HOME} element={<Dashboard />} />
            <Route path={RouthPath.EMPLOYEES} element={<Employees />} />
            <Route path={RouthPath.PROJECTS} element={<Projects />} />
            <Route path={RouthPath.REPORTS} element={<Reports />} />
            <Route path={RouthPath.TIMESHEET} element={<TimeSheet />} />
            <Route path={RouthPath.HOLIDAY} element={<HolidayCalender />} />
            <Route path={RouthPath.ADDHOLIDAY} element={<AddHoliday />} />
            <Route path={RouthPath.ONBOARDING} element={<Onboarding />} />
            <Route path={RouthPath.VIEWEMPLOYEE} element={<ViewEmployees />} />
            <Route path={RouthPath.EDITEMPLOYEE} element={<EditEmployee />} />
            <Route path={RouthPath.ADDPROJECT} element={<AddProject />} />
            <Route path={RouthPath.VIEWPROJECT} element={<ViewProject />} />
            <Route path={RouthPath.EDITPROJECT} element={<EditProject />} /> 
          </Route>*/}
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
