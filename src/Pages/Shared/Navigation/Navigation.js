import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navigation = () => {
  const {user, logOut} = useAuth();
    return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Doctors Portal
          </Typography>
          <Link style={{textDecoration: 'none', color: 'white'}} to="/home"><Button color="inherit">Home</Button></Link>
          <Link style={{textDecoration: 'none', color: 'white'}} to="/appointment"><Button color="inherit">Appointment</Button></Link>
          <Link style={{textDecoration: 'none', color: 'white'}} to="/dashboard"><Button color="inherit">Dashboard</Button></Link>
          {user.email && <Button color="inherit">{user.displayName}</Button>}
          {user.email ? 
        <Button onClick={logOut} color="inherit">Logout</Button>
          :
        <Link style={{textDecoration: 'none', color: 'white'}} to="/login"><Button color="inherit">Login</Button></Link>  
        }
          
        </Toolbar>
      </AppBar>
    </Box>
    );
};

export default Navigation;