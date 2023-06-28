import React, { useEffect } from 'react';
import IsAdmin from '@/components/UI/Auth/IsAdmin';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCourseLessons } from '@/features/lessons/lessonsThunks';
import { useRouter } from 'next/router';
import { selectLessons, selectLessonsLoading } from '@/features/lessons/lessonsSlice';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
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
import Link from 'next/link';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiURL } from '../../../../../constants';

const Course = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = Number(router.query.id);
  const lessons = useAppSelector(selectLessons);
  const loading = useAppSelector(selectLessonsLoading);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseLessons(id));
    }
  }, [dispatch, id]);

  return (
    <Box>
      <Grid container spacing={4} alignContent="flex-end">
        <Grid item xs={12} md={6} display={'flex'} justifyContent={{ xs: 'center', md: 'flex-start' }}>
          <Typography>Ниже список всех уроков этого курса</Typography>
        </Grid>
        <Grid item xs={12} md={6} display={'flex'} justifyContent={{ xs: 'center', md: 'flex-end' }}>
          <Button>
            <Link href={'/admin/addLesson/' + id} style={{ textDecoration: 'none' }}>
              Добавить урок
            </Link>
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="courses-table" className={`${isMdScreen ? 'admin-courses-big' : 'admin-courses-small'}`}>
            <TableHead>
              <TableRow>
                <TableCell>Модуль</TableCell>
                <TableCell>Номер</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Видео</TableCell>
                <TableCell>Удалить</TableCell>
                <TableCell>Редактировать</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons.map((lesson) => (
                <TableRow key={lesson.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    #{lesson.module.number} {lesson.module.title}
                  </TableCell>
                  <TableCell>{lesson.number}</TableCell>
                  <TableCell>{lesson.title}</TableCell>
                  <TableCell
                    style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {lesson.description}
                  </TableCell>
                  <TableCell>
                    <Link href={apiURL + '/' + lesson.video} target="_blank">
                      Видео
                    </Link>
                  </TableCell>

                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="contained"
                      sx={{ background: '#EDA652' }}
                      // onClick={() => handleDelete(course.id.toString())}
                      // disabled={deleting}
                    >
                      {/*{deleting ? (*/}
                      {/*  <Box sx={{ display: 'flex' }}>*/}
                      {/*    <CircularProgress />*/}
                      {/*  </Box>*/}
                      {/*) : (*/}
                      <DeleteIcon />
                      {/*)}*/}
                    </Button>
                  </TableCell>

                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button variant="outlined" sx={{ borderColor: '#EDA652' }}>
                      <Link href={`/admin/addLesson`}>
                        <EditIcon sx={{ color: '#EDA652' }} />
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

export default IsAdmin(Course);
