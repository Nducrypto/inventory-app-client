import React from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const InputAuth = ({
  id,
  onChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  multiline,
  rows,
  disabled,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      id={id}
      onChange={onChange}
      variant="outlined"
      required
      fullWidth
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={
        id === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  </Grid>
);

export default InputAuth;
