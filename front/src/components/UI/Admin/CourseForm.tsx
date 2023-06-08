import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { ApiCourse, CourseMutation } from '../../../../types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCategories } from '@/features/categories/categoriesSlice';
import { fetchCategories } from '@/features/categories/categoriesThunks';
import { selectTutors } from '@/features/users/usersSlice';
import { fetchTutors } from '@/features/users/usersThunks';
import { selectCoursesLoading } from '@/features/courses/coursesSlice';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parseISO } from 'date-fns';

interface Props {
  onSubmit: (course: ApiCourse) => void;
  exist?: CourseMutation;
  isEdit?: boolean;
}

const initialState: CourseMutation = {
  tutor: '',
  category: '',
  title: '',
  description: '',
  price: '',
  duration: '',
  isGroup: false,
  startedAt: '',
};

const CourseForm: React.FC<Props> = ({ onSubmit, exist = initialState, isEdit = false }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const tutors = useAppSelector(selectTutors);
  const adding = useAppSelector(selectCoursesLoading);
  const [state, setState] = useState<CourseMutation>(exist);
  const [date, setDate] = React.useState<Date | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTutors());
  }, [dispatch]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      isGroup: e.target.value === 'true',
    });
  };

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (date) {
      const updatedState = {
        ...state,
        tutor: parseFloat(state.tutor),
        category: parseFloat(state.category),
        startedAt: date.toISOString(),
        // startedAt: new Date(date),
      };
      onSubmit(updatedState);
    }
  };

  return (
    <>
      <Typography>{isEdit ? 'Обновите курс' : 'Добавьте новый курс'}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <label
              htmlFor="category"
              className="mb-2"
              style={{
                display: 'block',
                marginBottom: 5,
              }}
            >
              Категории курсов
            </label>
            <select
              id="category"
              name="category"
              className="form-control"
              required
              value={state.category}
              onChange={inputChangeHandler}
              style={{ width: 350 }}
            >
              <option disabled value="">
                Выберите категорию
              </option>
              {categories.map((category) => (
                <option key={category.id} id={category.id.toString()} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </Grid>

          <Grid item xs={12}>
            <label
              htmlFor="tutor"
              className="mb-2"
              style={{
                display: 'block',
                marginBottom: 5,
              }}
            >
              Преподаватели
            </label>
            <select
              id="tutor"
              name="tutor"
              className="form-control"
              required
              value={state.tutor}
              onChange={inputChangeHandler}
            >
              <option disabled value="">
                Выберите преподавателя
              </option>
              {tutors.map((tutor) => (
                <option key={tutor.id} id={tutor.id.toString()} value={tutor.id}>
                  {tutor.firstName} {tutor.lastName}
                </option>
              ))}
            </select>
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
              value={state.description}
              onChange={inputChangeHandler}
              sx={{ width: 350 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="price"
              label="Цена"
              name="price"
              required
              value={state.price}
              onChange={inputChangeHandler}
              sx={{ width: 350 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="duration"
              label="Длительность"
              name="duration"
              required
              value={state.duration}
              onChange={inputChangeHandler}
              sx={{ width: 350 }}
            />
          </Grid>

          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Начало курса"
                value={isEdit ? parseISO(state.startedAt) : date}
                onChange={handleDateChange}
                sx={{ width: 350 }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={state.isGroup}
              onChange={handleRadioChange}
              sx={{ width: 350 }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Групповой" />
              <FormControlLabel value={false} control={<Radio />} label="Индивидуальный" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled={
                adding ||
                !state.tutor ||
                !state.category ||
                !state.title ||
                !state.description ||
                !state.duration ||
                !state.price ||
                !date
              }
              type="submit"
            >
              {adding && <CircularProgress />}
              {isEdit ? 'Обновить курс' : 'Добавить курс'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CourseForm;
