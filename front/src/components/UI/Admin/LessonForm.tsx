import React, { useEffect, useState } from 'react';
import { FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { LessonMutation } from '../../../../types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createLesson, fetchCourseModules } from '@/features/lessons/lessonsThunks';
import { useRouter } from 'next/router';
import { selectCourseModules } from '@/features/lessons/lessonsSlice';
import FileInput from '@/components/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';

const initialState: LessonMutation = {
  course: 0,
  module: 0,
  number: 0,
  title: '',
  video: '',
  description: '',
  isStopLesson: false,
};

const LessonForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = Number(router.query.id);
  const modules = useAppSelector(selectCourseModules);
  const [state, setState] = useState<LessonMutation>(initialState);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const switchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => {
      return { ...prevState, isStopLesson: e.target.checked };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createLesson(state)).unwrap();
    await router.push(`/admin/courses/course/${id}`);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseModules(id));
      setState((prevState) => ({ ...prevState, course: id }));
    }
  }, [dispatch, id]);

  return (
    <>
      <Typography>Добавьте новый урок</Typography>
      <form onSubmit={submitForm}>
        <Grid container direction={'column'} spacing={2}>
          <Grid item xs={12}>
            <label
              htmlFor="module"
              className="mb-2"
              style={{
                display: 'block',
                marginBottom: 5,
              }}
            >
              Выберите модуль
            </label>
            <select
              id="module"
              name="module"
              className="form-control"
              required
              value={state.module}
              onChange={inputChangeHandler}
              style={{ width: 350 }}
            >
              <option defaultValue="">Выберите модуль</option>
              {modules.map((module) => (
                <option key={module.id} id={module.id.toString()} value={module.id}>
                  #{module.number} {module.title}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="number"
              label="Номер урока"
              name="number"
              type="number"
              required
              value={state.number}
              onChange={inputChangeHandler}
              sx={{ width: 350 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Название"
              name="title"
              required
              value={state.title}
              onChange={inputChangeHandler}
              sx={{ width: 350 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Описание"
              name="description"
              required
              multiline
              minRows={6}
              maxRows={6}
              value={state.description}
              onChange={inputChangeHandler}
              sx={{ width: 350 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  id="isStopLesson"
                  name="isStopLesson"
                  required
                  value={state.isStopLesson}
                  onChange={switchChangeHandler}
                />
              }
              label="Стоп урок"
            />
          </Grid>
          <Grid item xs={12} sx={{ width: 350 }}>
            <FileInput onChange={fileInputChangeHandler} name="video" label="Видео" />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton type="submit">Создать</LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LessonForm;
