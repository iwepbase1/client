import { Box, Paper, Typography, Fade } from "@mui/material";
import StepForm from "./components/StepForm";
import TopBar from "../../core/components/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Auth/AuthSlice";
import useAsyncRequest from "../../core/networking/useAsyncRequest";
import { onBoarding } from "../../store/onBoarding/services";
import Loader from "../../core/components/Loader";
import { useNavigate } from "react-router-dom";
import { USERDASHBOARD } from "../../router/config";

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };

  const loginedUser = useSelector((state: any) => state.auth.user);

  const { execute, loading } = useAsyncRequest(onBoarding);

  const handleResponse = (response: any) => {
    if (response.status === 200) {
      navigate(USERDASHBOARD);
    } else {
      console.error("Login failed:", response.data);
    }
  };

  const handleSubmit = (values: any) => {
    const payload = {
      email: loginedUser.email,
      participation: values.participation,
      interests: values.interests,
      skills: values.skills,
      support: values.support,
      help: values.help,
      joinWhatsApp: values.joinWhatsApp,
    };

    execute(payload, handleResponse);
  };

  return (
    <>
      <Loader open={loading} />
      <TopBar/>
      <Fade in timeout={600}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          bgcolor="#f5f7fa"
          px={2}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: 700,
              p: 4,
              borderRadius: 3,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
            >
              Welcome to IWEP
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              mb={4}
              textAlign="center"
            >
              Let’s get you onboarded. This won’t take more than a few minutes!
            </Typography>
            <StepForm onSubmit={(data: any) => handleSubmit(data)} />
          </Paper>
        </Box>
      </Fade>
    </>
  );
};

export default Onboarding;
