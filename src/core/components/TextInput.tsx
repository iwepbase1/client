/* eslint-disable */
import { Box, TextField, Typography } from "@mui/material";
import { FC, FocusEventHandler } from "react";
import { PRIMARYCOLOR } from "../constants/colors";
import { FontWeight, TextFieldType } from "../types";


interface TextInputProps {
  label: string;
  labelHeight?: any;
  onChange: any;
  type?: string;
  name?: string;
  value?: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
  helperText?: any;
  multiline?: boolean;
  row?: number;
  width?: any;
  textFieldHeigt?: any;
  mt?: number;
  sx?: string;
  disabled? : boolean;
}

const TextInput: FC<TextInputProps> = ({
  label,
  labelHeight = 40,
  onChange,
  type = TextFieldType.TEXT,
  name,
  value,
  onBlur,
  error,
  helperText,
  multiline = false,
  row = 1,
  width = "100%",
  textFieldHeigt = 20,
  disabled = false,
  mt,
}) => {
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
        size="small"
        sx={{
          width: { xs: width, md: width },
          minWidth: 200,
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
        multiline={multiline}
        rows={row}
        onChange={onChange}
        type={type}
        error={error}
        name={name}
        value={value}
        onBlur={onBlur}
        helperText={helperText}
        disabled={disabled}
      />
    </Box>
  );
};

export default TextInput;
