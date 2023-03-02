import { Button, Backdrop, Typography, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../../States/Context/ContextProvider";
const LogoutPrompt = ({ logout }) => {
  const navigate = useNavigate();
  const { setPrompt, prompt } = useStateContext();
  return (
    // <AppBar>
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={prompt}
      >
        <Paper
          sx={{
            width: { xs: "70%", sm: "40%", md: "30%" },
            padding: "1rem 1rem 1rem 1rem",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              marginTop: { md: "2rem", lg: "2rem", sm: "2rem", xs: "0.5rem" },
            }}
          >
            Are you sure ?
          </Typography>
          <Typography
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "space-around",
              marginTop: { md: "2rem", lg: "2rem", sm: "2rem", xs: "1.5rem" },
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                logout();
                setPrompt(false);
                navigate("/");
              }}
            >
              logout
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setPrompt(false);
              }}
            >
              Cancel
            </Button>
          </Typography>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default LogoutPrompt;
