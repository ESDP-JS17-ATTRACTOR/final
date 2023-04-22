import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectCategories,
} from "@/features/categories/categoriesSlice";
import { fetchCategories } from "@/features/categories/categoriesThunks";
import { Dialog, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import CategoryForm from "@/components/UI/Admin/CategoryForm";


const Courses = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const [isDialogueOpen, setIsDialogOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };


  return (
    <div style={{ padding: 5 }}>
      <div>
        <label
          htmlFor="category"
          className="mb-2"
          style={{
            display: "block",
            marginBottom: 5
          }}
        >
          Категории курсов
        </label>
        <select
          id="category"
          name="category"
          className="form-control"
        >
          <option disabled value="">Выберите категорию</option>

          {categories.map(category => (
            <option
              key={category.id}
              id={category.id.toString()}
              value={category.id}>{category.title}</option>
          ))}
        </select>
      </div>
      <div>
        {/*уйдет в форму добавления курса*/}
        <button
        onClick={openDialog}
        >Open Dialog for category form</button>
        <Dialog
          fullScreen={fullScreen}
          open={isDialogueOpen}
          onClose={closeDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <CategoryForm
              onClose={closeDialog}
            />
          </DialogContent>
        </Dialog>
      {/*  уйдет в форму добавления курса */}
      </div>
    </div>
  );
};

export default Courses;

