import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { useStateContext } from "../../States/Context/ContextProvider";

const CustomizedSnackbar = ({ message }) => {
  const { setSnackBarOpen, snackBarOpen } = useStateContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBarOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackBarOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      sx={{
        width: "100%",
        zIndex: "15000000",
      }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbar;
