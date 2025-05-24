import { TextField, Box, Typography } from "@mui/material";
import { FontWeight } from "../types";
import { PRIMARYCOLOR } from "../constants/colors";

const TextInputDropDown = ({
  select = false,
  children,
  width = "100%",
  label,
  textFieldHeigt = 20,
  labelHeight = 40,
  mt,
  ...props
}: any) => {
  return (
    <Box sx={{ padding: { xs: 1, sm: 1, md: 1 } }} mt={mt}>
         <Box
        sx={{
          height: {
            sx: label.length > 40 ? 50 : labelHeight,
            md: label.length > 60 ? 60 : labelHeight,
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Typography paddingBottom={1} fontSize={15} fontWeight={FontWeight.BOLD} color={PRIMARYCOLOR}>
          {label}
        </Typography>
      </Box>

      <TextField
        select={select}
        {...props}
        size="small"
        sx={{
          width: { xs: width, md: width },
          height: textFieldHeigt,
          "& .MuiOutlinedInput-root": {
            color: "#000",
            fontFamily: "Arial",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#52aaff",
              borderWidth: 1,
              borderRadius: 2,
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "#2e2e2e",
          },
        }}
      >
        {select && children}
      </TextField>
    </Box>
  );
};
export default TextInputDropDown;
