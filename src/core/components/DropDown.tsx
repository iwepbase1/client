import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FC, FocusEventHandler } from "react";

interface TextInputProps {
  label: string;
  onChange: any;
  name?: string;
  value?: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
  helperText?: any;
  mt?: number;
  options? : Array<string>
}

const DropDown: FC<TextInputProps> = ({
  label,
  onChange,
  name,
  value,
  onBlur,
  error,
  helperText,
  options,
  mt,
}) => {
  return (
    <Box mt={mt}>
      <Box
        width={'100%'}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Typography paddingBottom={1} fontSize={14} color={"#72777a"}>
          {label}
        </Typography>
      </Box>
     <FormControl fullWidth sx={{height : 40}} error={error && helperText }>
            <InputLabel id="dropdown-label"></InputLabel>
            <Select
              labelId="dropdown-label"
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              sx={{height : 42}}
            >
              {options?.map((value : string)=>{
                return  <MenuItem value={value}>{value}</MenuItem>
              })}
             
              {/* <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem> */}
            </Select>
            { error && (
              <FormHelperText style={{color : 'red'}}>{helperText}</FormHelperText>
            )}
          </FormControl>
    </Box>
  );
};

export default DropDown;
