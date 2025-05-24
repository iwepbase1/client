import { Box, Typography, Paper } from "@mui/material";
import TopBar from "../../../core/components/AppBar";

const UserDashboard = () => {
  return (
    <>
      <TopBar />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "linear-gradient(135deg, #6a1b9a 30%, #283593 90%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            maxWidth: 400,
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "white",
            boxShadow:
              "0 8px 20px rgba(106,27,154,0.3), 0 4px 10px rgba(40,53,147,0.2)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#6a1b9a" }}
          >
            🎉 Thank You!
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", fontSize: 18 }}>
            We appreciate your interest.
            <br />
            Welcome to{" "}
            <Box component="span" sx={{ fontWeight: "bold", color: "#283593" }}>
              IWEP
            </Box>{" "}
            🚀
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default UserDashboard;
