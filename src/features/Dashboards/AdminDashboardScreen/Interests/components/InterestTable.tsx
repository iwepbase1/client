import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import { format } from "date-fns";

const InterestTable = (props: any) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Sl</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Participation</TableCell>
            <TableCell>Interests</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell>Support</TableCell>
            <TableCell>Help</TableCell>
            <TableCell>Join WhatsApp</TableCell>
            <TableCell>Submitted on</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((entry: any, index: number) => (
            <TableRow key={entry._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell>
                {entry.participation.map((p: any, i: number) => (
                  <Chip
                    key={i}
                    label={p}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </TableCell>
              <TableCell>
                {entry.interests.map((interest: any, i: number) => (
                  <Chip
                    key={i}
                    label={interest}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </TableCell>
              <TableCell>{entry.skills || "-"}</TableCell>
              <TableCell>{entry.support || "-"}</TableCell>
              <TableCell>
                {entry.help.map((h: any, i: number) => (
                  <Chip
                    key={i}
                    label={h}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </TableCell>
              <TableCell>{entry.joinWhatsApp ? "Yes" : "No"}</TableCell>
              <TableCell>
                {format(new Date(entry.submittedAt), "dd/MM/yyyy HH:mm")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InterestTable;
