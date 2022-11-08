import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser } from "../../States/Actions/authActions";
import {
  Button,
  Grid,
  Paper,
  Container,
  createTheme,
  Typography,
  CircularProgress,
} from "@mui/material";
import InputAuth from "../Auth/InputAuth";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const theme = createTheme();

  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user?.result?._id;

  const { singleUser, loading } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  const handleSubmit = () => {
    dispatch(
      updateUser(id, {
        bio: bio,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      })
    );
    setBio("");
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div style={{ marginTop: "7rem" }}>
      <div>
        {!open ? (
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            style={{ float: "right", borderRadius: "1rem" }}
          >
            edit Profile
          </Button>
        ) : (
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            style={{ float: "right", borderRadius: "1rem" }}
          >
            cancel
          </Button>
        )}
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        singleUser?.map((p) => (
          <div key={p._id}>
            <Typography
              sx={{
                fontSize: "1.5rem",
              }}
            >
              <>
                {p.firstName} {p.lastName}
              </>
            </Typography>

            <Typography
              sx={{
                fontSize: "1.1rem",
              }}
            >
              {p.email}
            </Typography>
            <Typography sx={{ fontSize: "1.3rem" }}>{p.phoneNumber}</Typography>
            <Typography sx={{ fontSize: "1.4rem" }}> {p.bio}</Typography>

            <Container component="main" maxWidth="xs">
              {open && (
                <Paper
                  elevation={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: theme.spacing(2),
                  }}
                >
                  <Grid container spacing={2}>
                    <InputAuth
                      disabled
                      label="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputAuth
                      label="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputAuth
                      label="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <InputAuth
                      label="phoneNumber"
                      type="Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <InputAuth
                      multiline
                      rows={5}
                      label="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{
                        margin: theme.spacing(3, 0, 2),
                        marginTop: theme.spacing(3),
                      }}
                      onClick={() => {
                        handleSubmit();
                        setOpen(false);
                      }}
                    >
                      submit
                    </Button>
                  </Grid>
                </Paper>
              )}
            </Container>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
