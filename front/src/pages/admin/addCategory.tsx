import React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { useRouter } from 'next/router';
import { CategoryMutation } from '../../../types';
import { addCategory } from '@/features/categories/categoriesThunks';
import CategoryForm from '@/components/UI/Admin/CategoryForm';
import IsAdmin from '@/components/UI/Auth/IsAdmin';

const AddCategory = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (category: CategoryMutation) => {
    await dispatch(addCategory(category));
    await router.push('/admin/categories');
  };

  return (
    <>
      <CategoryForm onSubmit={onSubmit} />
    </>
  );
};

export default IsAdmin(AddCategory);
