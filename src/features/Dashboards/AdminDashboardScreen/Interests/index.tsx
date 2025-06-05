import { get } from "http";
import useAsyncRequest from "../../../../core/networking/useAsyncRequest";
import { getAllInterest } from "../../../../store/AdminDashBoard/services";
import { useEffect, useState } from "react";
import Loader from "../../../../core/components/Loader";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import InterestTable from "./components/InterestTable";
import { FontWeight } from "../../../../core/types";

const InterestScreens = () => {
  const [interests, setInterests] = useState([]);
  const { execute, loading } = useAsyncRequest(getAllInterest);

  useEffect(() => {
    execute({}, (response: any) => {
      if (response.status === 200) {
        console.log("Interests fetched successfully:", response.data);
        const { data } = response;
        setInterests(data.insterestRecieved);
      } else {
        console.error("Failed to fetch interests:", response.data);
      }
    });
  }, []);

  return (
    <Box>
      <Loader open={loading} />

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight={FontWeight.BOLD}>
          Interest Submissions Overview
        </Typography>

        <Divider sx={{ my: 2 }} />

        {interests.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No interests found.
          </Typography>
        ) : (
          <InterestTable data={interests} />
        )}
      </Paper>
    </Box>
  );
};

export default InterestScreens;
