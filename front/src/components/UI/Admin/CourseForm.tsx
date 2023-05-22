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

interface Props {
  onSubmit: (course: ApiCourse) => void;
  exist?: CourseMutation;
  isEdit?: boolean;
}

const initialState: CourseMutation = {
  tutor: '',
  category: '',
  title: '',
  price: '',
  duration: '',
  isGroup: false,
};

const CourseForm: React.FC<Props> = ({ onSubmit, exist = initialState, isEdit = false }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const tutors = useAppSelector(selectTutors);
  const adding = useAppSelector(selectCoursesLoading);
  const [state, setState] = useState<CourseMutation>(exist);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      ...state,
      tutor: parseFloat(state.tutor),
      category: parseFloat(state.category),
    });
  };

  return (
    <>
      <Typography>{isEdit ? 'Обновите курс' : 'Добавьте новый курс'}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
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

          <Grid item xs>
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

          <Grid item xs>
            <TextField
              id="title"
              label="Title"
              name="title"
              required
              value={state.title}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="price"
              label="Price"
              name="price"
              required
              value={state.price}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="duration"
              label="Duration"
              name="duration"
              required
              value={state.duration}
              onChange={inputChangeHandler}
            />
          </Grid>

          <Grid item xs>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={state.isGroup}
              onChange={handleRadioChange}
            >
              <FormControlLabel value={true} control={<Radio />} label="Групповой" />
              <FormControlLabel value={false} control={<Radio />} label="Индивидуальный" />
            </RadioGroup>
          </Grid>

          <Grid item xs>
            <Button
              disabled={adding || !state.tutor || !state.category || !state.title || !state.duration || !state.price}
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
