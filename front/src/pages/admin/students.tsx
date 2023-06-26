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
import { selectStudents, selectStudentsLoading } from '@/features/users/usersSlice';
import { fetchStudents } from '@/features/users/usersThunks';

const Students = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudents);
  const loading = useAppSelector(selectStudentsLoading);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <Box>
      <Grid container spacing={4} alignContent="flex-end">
        <Grid item xs={12} md={6} display={'flex'} justifyContent={{ xs: 'center', md: 'flex-start' }}>
          <Typography>Ниже список всех студентов</Typography>
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
              {students.map((student) => (
                <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>
                    {student.purchases.length === 0 ? (
                      'Студент еще не купил курс'
                    ) : (
                      <List style={{ padding: 0 }}>
                        {student.purchases.map((purchase, index) => (
                          <ListItem key={index} style={{ padding: 0 }}>
                            {purchase}
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

export default Students;
