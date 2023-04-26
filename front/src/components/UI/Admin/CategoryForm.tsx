import React, {useState} from "react";
import {useRouter} from "next/router";
import {CategoryMutation} from "../../../../types";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectCategoryAddError, selectCategoryAdding} from "@/features/categories/categoriesSlice";
import {fetchCategories} from "@/features/categories/categoriesThunks";
import {
    Alert,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography
} from "@mui/material";


interface Props {
    onSubmit: (category: CategoryMutation) => void;
    exist?: CategoryMutation;
    isEdit?: boolean
}

const initialState: CategoryMutation = {
    title: '',
}

const CategoryForm: React.FC<Props> = ({onSubmit, exist = initialState, isEdit = false}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isAdding = useAppSelector(selectCategoryAdding);
    const error = useAppSelector(selectCategoryAddError);
    const [category, setCategory] = useState<CategoryMutation>(exist);


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategory(prev => ({...prev, [name]: value}));
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(category);
        await dispatch(fetchCategories());
        await router.push("/admin/categories");
    };

    return (
        <>
            <form onSubmit={onFormSubmit}>
                {error && (
                    <Alert severity="error" sx={{mt: 3, width: "100%"}}>
                        {error.message}
                    </Alert>
                )}
                <Typography
                    sx={{marginBottom: 2}}>{isEdit ? 'Редактировать категорию' : 'Добавить категорию'}</Typography>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField
                            id="title" label="Title"
                            value={category.title}
                            onChange={inputChangeHandler}
                            name="title"
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <Button
                            disabled={isAdding || !category.title}
                            type="submit">{isAdding && <CircularProgress/>}
                            {isEdit ? 'Отредактировать' : 'Добавить'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default CategoryForm;