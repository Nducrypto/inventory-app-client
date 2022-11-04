import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useStateContext } from "../../States/Context/ContextProvider";
const LogoutPrompt = ({ logout }) => {
  const navigate = useNavigate();
  const { setPrompt } = useStateContext();
  return (
    // <AppBar>
    <div className="container">
      <Paper
        elevation={9}
        sx={{
          width: { lg: "50%", xs: "60%", sm: "50%", md: "50%" },
          height: { lg: "40%", xs: "20%", sm: "30%", md: "40%" },
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
    </div>
  );
};

export default LogoutPrompt;
