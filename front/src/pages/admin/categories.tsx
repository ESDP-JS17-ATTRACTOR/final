import React, { useEffect } from 'react';
import { deleteCategory, fetchCategories } from '@/features/categories/categoriesThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoryDeleting,
} from '@/features/categories/categoriesSlice';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';

const Categories = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoriesLoading);
  const deleting = useAppSelector(selectCategoryDeleting);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = async (categoryId: string) => {
    await dispatch(deleteCategory(categoryId));
    await dispatch(fetchCategories());
    await router.push('/admin/categories');
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>Ниже список всех категорий</Typography>
        <Button>
          {' '}
          <Link href="/admin/addCategory">Добавить категорию</Link>
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Название категории</TableCell>
                <TableCell align="center" sx={{ width: '5%' }}>
                  Удалить
                </TableCell>
                <TableCell align="center" sx={{ width: '5%' }}>
                  Редактировать
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {category.title}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(category.id.toString())}
                      disabled={deleting}
                    >
                      {deleting ? (
                        <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                        </Box>
                      ) : (
                        <DeleteIcon />
                      )}
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button variant="outlined">
                      <Link href={`/admin/editCategory/${category.id}`}>
                        <EditIcon />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Categories;
