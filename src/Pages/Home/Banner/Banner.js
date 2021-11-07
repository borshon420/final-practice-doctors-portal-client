import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import chair from '../../../images/chair.png';


const Banner = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
      <Container>
      <Grid container spacing={2} sx={{mt: 8}}>
        <Grid item xs={12} md={6} sx={{textAlign: 'left'}}>
        <Typography variant="h4" gutterBottom component="div">
        Your New Smile <br /> Starts Here
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img style={{width: '100%'}} src={chair} alt="" />
        </Grid>
      </Grid>
      </Container>
    </Box>
    );
};

export default Banner;