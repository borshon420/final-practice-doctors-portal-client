import { Alert, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Booking from "../Booking/Booking";

const bookings = [
  {
    id: 1,
    name: "Teeth Orthodontics",
    time: "8:00 AM - 9.00 AM",
    space: 10,
  },
  {
    id: 2,
    name: "Cosmetic Dentistry",
    time: "10:05 AM - 11.30 AM",
    space: 8,
  },
  {
    id: 3,
    name: "Teeth Cleaning",
    time: "5:00 PM - 6.30 PM",
    space: 9,
  },
  {
    id: 4,
    name: "Cavity Protection",
    time: "7:00 AM - 8.30 AM",
    space: 5,
  },
  {
    id: 5,
    name: "Pediatric Dental",
    time: "6:00 PM - 7.00 PM",
    space: 10,
  },
  {
    id: 6,
    name: "Oral Surgery",
    time: "7:00 PM - 8.00 PM",
    space: 10,
  },
];

const AvailableAppointment = ({ date }) => {
    const [bookingSuccess, setBookingSuccess] = useState(false); 
  return (
    <Container>
      <Typography variant="h4" sx={{ color: "info.main", mb: 2 }}>
        Available appointment on {date.toDateString()}{" "}
      </Typography>
      {bookingSuccess && <Alert severity="success">Appointment Booked Successfully!</Alert>}
      <Grid container spacing={2}>
          {
              bookings.map(booking => <Booking 
                key={booking._id}
                booking={booking}
                date={date}
                setBookingSuccess={setBookingSuccess}
                ></Booking>)
          }
      </Grid>
    </Container>
  );
};

export default AvailableAppointment;
