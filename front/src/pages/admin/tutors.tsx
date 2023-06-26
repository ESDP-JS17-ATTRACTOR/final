import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { selectTutors, selectTutorsLoading } from '@/features/users/usersSlice';
import { fetchTutors } from '@/features/users/usersThunks';

const Tutors = () => {
  const dispatch = useAppDispatch();
  const tutors = useAppSelector(selectTutors);
  const loading = useAppSelector(selectTutorsLoading);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    dispatch(fetchTutors());
  }, [dispatch]);

  return (
    <Box>
      <Grid container spacing={4} alignContent="flex-end">
        <Grid item xs={12} md={6} display={'flex'} justifyContent={{ xs: 'center', md: 'flex-start' }}>
          <Typography>Ниже список всех преподавателей</Typography>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table
            aria-label="students-table"
            className={`${isMdScreen ? 'admin-students-big' : 'admin-students-small'}`}
          >
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Курс</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tutors.map((tutor) => (
                <TableRow key={tutor.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{tutor.firstName}</TableCell>
                  <TableCell>{tutor.lastName}</TableCell>
                  <TableCell>
                    {tutor.courses.length === 0 ? (
                      'Неизвестен курс преподавателя'
                    ) : (
                      <List style={{ padding: 0 }}>
                        {tutor.courses.map((course, index) => (
                          <ListItem key={index} style={{ padding: 0 }}>
                            {course}
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Tutors;
