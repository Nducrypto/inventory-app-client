import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import InputAuth from "./InputAuth";
import { login, register } from "../../States/Actions/authActions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formAuth, setFormAuth] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector((state) => state.authReducer);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // SWITCHMODE
  const switchMode = () => {
    setFormAuth(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  // HANDLESUBMIT;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(register(formAuth, navigate));
    } else {
      dispatch(login(formAuth, navigate));
    }
  };

  // HANDLECHANGE
  const handleChange = (e) =>
    setFormAuth({ ...formAuth, [e.target.id]: e.target.value });

  const theme = createTheme();

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: "7rem",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          marginTop: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
      >
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>

        {/* SIGNUP OR SIGN IN FORM TOGGLER */}
        <Typography component="h1" variant="h5">
          {isSignup ? "Create a new account " : "Log in to Budget-tracker"}
        </Typography>
        <div>{error && error.message}</div>
        {loading && <CircularProgress />}

        <form
          style={{
            width: "100%",
            marginTop: theme.spacing(3),
          }}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <InputAuth
                  id="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <InputAuth
                  id="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}

            <InputAuth
              id="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />

            <InputAuth
              id="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignup && (
              <InputAuth
                id="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              margin: theme.spacing(3, 0, 2),
              marginTop: theme.spacing(3),
            }}
            onClick={handleSubmit}
          >
            {isSignup ? "Create my account" : "Log In"}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
