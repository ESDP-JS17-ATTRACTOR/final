import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { CategoryMutation } from '../../../../types';
import { selectOneCategory } from '@/features/categories/categoriesSlice';
import { editCategory, fetchOneCategory } from '@/features/categories/categoriesThunks';
import CategoryForm from '@/components/UI/Admin/CategoryForm';
import IsAdmin from '@/components/UI/Auth/IsAdmin';

interface Props {
  id: string;
}

const EditCourse: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectOneCategory);

  useEffect(() => {
    dispatch(fetchOneCategory(id));
  }, [dispatch, id]);

  const onSubmit = async (category: CategoryMutation) => {
    await dispatch(editCategory({ id, category }));
  };

  return <>{category && <CategoryForm onSubmit={onSubmit} exist={category} isEdit />}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;

  return {
    props: {
      id: id,
    },
  };
};

export default IsAdmin(EditCourse);
