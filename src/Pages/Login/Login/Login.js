import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Container, TextField, Typography } from '@mui/material';
import login from '../../../images/login.png'



const Login = () => {
    const [loginData, setLoginData] = useState({});


    const handleonBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        console.log(newLoginData);
        setLoginData(newLoginData);
    }
    
    const handleOnSubmit = e => {
        e.preventDefault();
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
      <Container>
      <Grid container spacing={2} sx={{mt: 8}}>
        <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom component="div">
        Login
      </Typography>
      <form onSubmit={handleOnSubmit}>
      <TextField 
      sx={{width: '75%'}}
      id="standard-basic" 
      label="Your Email"
      type="email"
      name="email"
      onBlur={handleonBlur} 
      variant="standard" />
      <TextField 
      sx={{width: '75%'}}
      id="standard-basic" 
      label="Your password"
      type="password"
      name="password"
      onBlur={handleonBlur} 
      variant="standard" />
      <Button style={{ backgroundColor: "#37B5BB" }} sx={{width: '75%', m:1}} type="Submit" variant="contained">Login</Button>
      </form>
       </Grid>
        <Grid item xs={12} md={6}>
          <img style={{width: '100%'}} src={login} alt="" />
        </Grid>
      </Grid>
      </Container>
    </Box>
    );
};

export default Login;