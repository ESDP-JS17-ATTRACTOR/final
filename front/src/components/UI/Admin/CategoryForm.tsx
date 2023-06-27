import React, { useEffect, useState } from 'react';
import { CategoryMutation } from '../../../../types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectCategoryAddError,
  selectCategoryAdding,
  selectCategoryEditError,
  selectCategoryEditing,
  unsetCategoryError,
} from '@/features/categories/categoriesSlice';
import { fetchCategories } from '@/features/categories/categoriesThunks';
import { Alert, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';

interface Props {
  onSubmit: (category: CategoryMutation) => void;
  exist?: CategoryMutation;
  isEdit?: boolean;
}

const initialState: CategoryMutation = {
  title: '',
};

const CategoryForm: React.FC<Props> = ({ onSubmit, exist = initialState, isEdit = false }) => {
  const dispatch = useAppDispatch();
  const isAdding = useAppSelector(selectCategoryAdding);
  const isEditing = useAppSelector(selectCategoryEditing);
  const addError = useAppSelector(selectCategoryAddError);
  const editError = useAppSelector(selectCategoryEditError);
  const [category, setCategory] = useState<CategoryMutation>(exist);

  useEffect(() => {
    dispatch(unsetCategoryError());
  }, [dispatch]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(category);
      await dispatch(fetchCategories());
      setCategory(initialState);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        {(addError || editError) && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {addError?.message || editError?.message}
          </Alert>
        )}
        <Typography sx={{ marginBottom: 2 }}>{isEdit ? 'Редактировать категорию' : 'Добавить категорию'}</Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              id="title"
              label="Title"
              value={category.title}
              onChange={inputChangeHandler}
              name="title"
              required
            />
          </Grid>
          <Grid item xs>
            <Button disabled={isAdding || isEditing || !category.title} type="submit">
              {(isAdding || isEditing) && <CircularProgress />}
              {isEdit ? 'Отредактировать' : 'Добавить'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CategoryForm;
