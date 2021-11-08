import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Appointments = ({date}) => {
    const [appointments, setAppointments] = useState([]);
    const {user} = useAuth();
    useEffect(()=>{
        const url = `http://localhost:5000/appointments?email=${user.email}&date=${date}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setAppointments(data))
    }, [date])

    return (
        <>
        <h2>Appointments: {appointments.length}</h2>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Service</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.patientName}
              </TableCell>
              <TableCell align="left">{row.time}</TableCell>
              <TableCell align="left">{row.serviceName}</TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    );
};

export default Appointments;