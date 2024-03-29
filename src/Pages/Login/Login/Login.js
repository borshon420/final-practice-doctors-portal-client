import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Container, TextField, Typography } from "@mui/material";
import login from "../../../images/login.png";
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const {loginUser, signInWithGoogle} = useAuth();

  const location = useLocation();
  const history = useHistory();

  const handleonBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    console.log(newLoginData);
    setLoginData(newLoginData);
  };

  const handleOnSubmit = (e) => {
    loginUser(loginData.email, loginData.password, location, history)
    e.preventDefault();
  };

  const loginWithGoogle = () => {
    signInWithGoogle(location, history)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <Grid container spacing={2} sx={{ mt: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom component="div">
              Login
            </Typography>
            <form onSubmit={handleOnSubmit}>
              <TextField
                sx={{ width: "75%" }}
                id="standard-basic"
                label="Your Email"
                type="email"
                name="email"
                onBlur={handleonBlur}
                variant="standard"
              />
              <TextField
                sx={{ width: "75%" }}
                id="standard-basic"
                label="Your password"
                type="password"
                name="password"
                onBlur={handleonBlur}
                variant="standard"
              />
              <Button
                style={{ backgroundColor: "#37B5BB" }}
                sx={{ width: "75%", my: 2 }}
                type="Submit"
                variant="contained"
              >
                Login
              </Button>
              <Link style={{ textDecoration: "none", display: 'block' }} to="/register">
                <Button variant="text">New Here? Please Register</Button>
              </Link>
              <Button style={{ backgroundColor: "#37B5BB" }} onClick={loginWithGoogle} variant="contained">Google Sign In</Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{ width: "100%" }} src={login} alt="" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
