import React from 'react';
import { Grid, Paper, TableContainer } from '@mui/material';
import IsAdmin from '@/components/UI/Auth/IsAdmin';

const Lessons = () => {
  return (
    <Grid>
      <TableContainer component={Paper}>Lessons</TableContainer>
    </Grid>
  );
};

export default IsAdmin(Lessons);
