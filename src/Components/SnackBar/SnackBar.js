import { Snackbar, Alert, Container, Slide } from "@mui/material";
import React from "react";
import { useStateContext } from "../../States/Context/ContextProvider";

const CustomizedSnackbar = () => {
  const { setSnackBarOpen, snackBarOpen } = useStateContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBarOpen(false);
  };

  const TransitionLeft = (props) => {
    return <Slide {...props} direction="left" />;
  };

  return (
    <Container
      sx={{
        width: "100%",
        zIndex: "150000",
      }}
    >
      <Snackbar
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Transaction Successfully Created
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomizedSnackbar;
