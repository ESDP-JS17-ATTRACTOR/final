import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCategories } from '@/features/categories/categoriesThunks';
import { deleteCourse, fetchCourses } from '@/features/courses/coursesThunks';
import { selectCourseDeleting, selectCourses, selectCoursesLoading } from '@/features/courses/coursesSlice';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Courses = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const loading = useAppSelector(selectCoursesLoading);
  const deleting = useAppSelector(selectCourseDeleting);
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = async (courseId: string) => {
    await dispatch(deleteCourse(courseId));
    await dispatch(fetchCourses());
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>Ниже список всех курсов</Typography>
        <Button>
          {' '}
          <Link href="/admin/addCourse">Добавить курс</Link>
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Название курса</TableCell>
                {isLargeScreen && (
                  <TableCell align="right" sx={{ width: '20%' }}>
                    Преподаватель
                  </TableCell>
                )}
                <TableCell align="center" sx={{ width: '20%' }}>
                  Длительность курса
                </TableCell>
                <TableCell align="center" sx={{ width: '10%' }}>
                  Цена
                </TableCell>
                <TableCell align="center" sx={{ width: '20%' }}>
                  Тип
                </TableCell>
                <TableCell align="center" sx={{ width: '5%' }}>
                  Удалить
                </TableCell>
                <TableCell align="center" sx={{ width: '5%' }}>
                  Редактировать
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {course.title}
                  </TableCell>
                  <TableCell align="right">
                    {course.tutor.firstName} {course.tutor.lastName}
                  </TableCell>
                  <TableCell align="right">{course.duration}</TableCell>
                  <TableCell align="right">{course.price} KGS</TableCell>
                  <TableCell align="right">{course.isGroup ? 'Групповой курс' : 'Индивидуальный курс'}</TableCell>

                  <TableCell align="center">
                    <Button variant="contained" onClick={() => handleDelete(course.id.toString())} disabled={deleting}>
                      {deleting ? (
                        <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                        </Box>
                      ) : (
                        <DeleteIcon />
                      )}
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button variant="outlined">
                      <Link href={`/admin/editCourse/${course.id}`}>
                        <EditIcon />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Courses;
