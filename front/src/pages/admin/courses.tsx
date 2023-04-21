import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCategories } from "@/features/categories/categoriesSlice";
import { fetchCategories } from "@/features/categories/categoriesThunks";


const Courses = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);



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
    </div>
  );
};

export default Courses;

