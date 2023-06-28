import React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { CategoryMutation } from '../../../types';
import { addCategory } from '@/features/categories/categoriesThunks';
import CategoryForm from '@/components/UI/Admin/CategoryForm';
import IsAdmin from '@/components/UI/Auth/IsAdmin';

const AddCategory = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (category: CategoryMutation) => {
    try {
      await dispatch(addCategory(category));
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <CategoryForm onSubmit={onSubmit} />
    </>
  );
};

export default IsAdmin(AddCategory);
