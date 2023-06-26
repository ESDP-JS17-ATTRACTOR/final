import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCourses } from '@/features/courses/coursesThunks';
import { selectCourses, selectCoursesLoading } from '@/features/courses/coursesSlice';
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import Footer from '@/components/UI/Footer/Footer';

const Catalogs = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const loading = useAppSelector(selectCoursesLoading);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="container">
      <Grid container spacing={4} alignContent="flex-end">
        <Grid item xs={12} display={'flex'} justifyContent={{ xs: 'center' }}>
          <h2>Ниже список всех курсов</h2>
        </Grid>
      </Grid>
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} style={{ marginBottom: '50px' }}>
          <Table aria-label="courses-table" className={`${isMdScreen ? 'admin-courses-big' : 'general-courses-small'}`}>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Преподаватель</TableCell>
                <TableCell>Период</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell>Начало</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell>Выбрать</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.tutor.firstName + ' ' + course.tutor.lastName}</TableCell>
                  <TableCell>{course.duration} дней</TableCell>
                  <TableCell>{course.price} KGS</TableCell>
                  <TableCell>{dayjs(course.startedAt.toString()).format('DD.MM.YYYY')} </TableCell>
                  <TableCell>{course.isGroup ? 'Групповой курс' : 'Индивидуальный курс'}</TableCell>
                  <TableCell>
                    <a href="#myForm" className="general-courses-link">
                      Записаться на курс
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Footer />
    </div>
  );
};

export default Catalogs;
