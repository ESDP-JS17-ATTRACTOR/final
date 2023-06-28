import React, { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { ApiPurchase, PurchaseMutation } from '../../../../types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCourses } from '@/features/courses/coursesSlice';
import { fetchCourses } from '@/features/courses/coursesThunks';
import {
  selectAssigningPurchase,
  selectAssignPurchaseError,
  unsetPurchaseError,
} from '@/features/purchases/purchasesSlice';

interface Props {
  onSubmit: (purchase: ApiPurchase) => void;
}

const PurchaseForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const addError = useAppSelector(selectAssignPurchaseError);
  const adding = useAppSelector(selectAssigningPurchase);
  const [state, setState] = useState<PurchaseMutation>({
    email: '',
    course: '',
  });

  useEffect(() => {
    dispatch(unsetPurchaseError());
    dispatch(fetchCourses());
  }, [dispatch]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedState = {
        ...state,
        course: parseFloat(state.course),
      };
      onSubmit(updatedState);
      setState({
        email: '',
        course: '',
      });
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <Typography>Записать студента на курс</Typography>
      <form onSubmit={handleSubmit}>
        {addError && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {addError.message}
          </Alert>
        )}
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <label
              htmlFor="course"
              className="mb-2"
              style={{
                display: 'block',
                marginBottom: 5,
              }}
            >
              Курсы
            </label>
            <select
              id="course"
              name="course"
              className="form-control"
              required
              value={state.course}
              onChange={inputChangeHandler}
              style={{ width: 350 }}
            >
              <option disabled value="">
                Выберите курс
              </option>
              {courses.map((course) => (
                <option key={course.id} id={course.id.toString()} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="email"
              label="Электронный адрес студента"
              name="email"
              type="email"
              required
              value={state.email}
              onChange={inputChangeHandler}
              sx={{ width: 350 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button disabled={adding || !state.course || !state.email} type="submit">
              {adding && <CircularProgress />}
              Записать на курс
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PurchaseForm;
