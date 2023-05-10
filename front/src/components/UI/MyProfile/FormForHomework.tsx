import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ApiHomework, Homework, HomeworkMutation } from '../../../../types';
import FileInput from '@/components/FileInput/FileInput';
import { selectLessons } from '@/features/lessons/lessonsSlice';
import { fetchLessons } from '@/features/lessons/lessonsThunks';
import { Grid, MenuItem, TextField } from '@mui/material';

interface Props {
  onSubmit: (homework: ApiHomework) => void;
  existHomework?: Homework;
}

const FormForHomework: React.FC<Props> = ({ onSubmit, existHomework }) => {
  const dispatch = useAppDispatch();
  const lessons = useAppSelector(selectLessons);
  const initialState = existHomework
    ? { lesson: '', title: existHomework.title, description: existHomework.description, pdf: null }
    : {
        lesson: '',
        title: '',
        description: '',
        pdf: null,
      };
  const [homework, setHomework] = useState<HomeworkMutation>(initialState);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHomework((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...homework,
      lesson: homework.lesson,
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setHomework((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setHomework((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  return (
    <form className="profile-add-homework-form" onSubmit={onFormSubmit}>
      <div className="profile-add-homework-form_box">
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              select
              fullWidth
              label="Выберите номер урока"
              id="lesson"
              name="lesson"
              required
              value={homework.lesson}
              onChange={inputChangeHandler}
            >
              <MenuItem disabled value="">
                Выберите урок
              </MenuItem>
              {lessons.map((lesson) => (
                <MenuItem key={lesson.id} id={lesson.id.toString()} value={lesson.id}>
                  {lesson.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs>
            <TextField
              fullWidth
              type="title"
              id="Title"
              name="title"
              label="Введите заголовок"
              required={true}
              value={homework.title}
              onChange={inputChangeHandler}
            />
          </Grid>

          <Grid item xs>
            <TextField
              fullWidth
              type="description"
              id="description"
              name="description"
              label="Введите описание"
              required={true}
              value={homework.description}
              onChange={inputChangeHandler}
            />
          </Grid>

          <Grid item xs>
            <FileInput onChange={fileInputChangeHandler} name="pdf" label="Выберите файл pdf" />
          </Grid>
        </Grid>
      </div>
      <button className="button profile-btn-add">Add</button>
    </form>
  );
};

export default FormForHomework;
