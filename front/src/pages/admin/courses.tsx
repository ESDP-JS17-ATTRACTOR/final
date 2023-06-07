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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';

const Courses = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const loading = useAppSelector(selectCoursesLoading);
  const deleting = useAppSelector(selectCourseDeleting);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = async (courseId: string) => {
    await dispatch(deleteCourse(courseId));
    await dispatch(fetchCourses());
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>Ниже список всех курсов</Typography>
        <Button>
          <Link href="/admin/addCourse">Добавить курс</Link>
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 320 }} aria-label="courses-table" className="admin-courses">
            <TableHead>
              <TableRow>
                <TableCell>Название курса</TableCell>
                <TableCell>Описание курса</TableCell>
                <TableCell>Преподаватель</TableCell>
                <TableCell>Длительность курса</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell>Начало курса</TableCell>
                <TableCell>Тип курса</TableCell>
                <TableCell>Удалить</TableCell>
                <TableCell>Редактировать</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>
                    {course.tutor.firstName} {course.tutor.lastName}
                  </TableCell>
                  <TableCell>{course.duration} дней</TableCell>
                  <TableCell>{course.price} KGS</TableCell>
                  <TableCell>{dayjs(course.startedAt.toString()).format('DD.MM.YYYY')} </TableCell>
                  <TableCell>{course.isGroup ? 'Групповой курс' : 'Индивидуальный курс'}</TableCell>

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

                  <TableCell>
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
    </Box>
  );
};

export default Courses;
