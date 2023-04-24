import React, {useEffect, useState} from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import CategoryForm from "@/components/UI/Admin/CategoryForm";
import {CourseMutation} from "../../../types";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectCategories} from "@/features/categories/categoriesSlice";
import {fetchCategories} from "@/features/categories/categoriesThunks";
import {selectTutors} from "@/features/users/usersSlice";
import {fetchTutors} from "@/features/users/usersThunks";
import {addCourse} from "@/features/courses/coursesThunks";
import {useRouter} from "next/router";
import {selectCoursesLoading} from "@/features/courses/coursesSlice";

const CourseForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isDialogueOpen, setIsDialogOpen] = useState(false);
    const categories = useAppSelector(selectCategories);
    const tutors = useAppSelector(selectTutors);
    const adding = useAppSelector(selectCoursesLoading);
    const [state, setState] = useState<CourseMutation>({
        tutor: '',
        category: '',
        title: '',
        price: '',
        duration: '',
        isGroup: false,
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTutors());
    }, [dispatch]);


    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await dispatch(addCourse(state));
        await router.push("/admin/courses");
    };


    return (
        <>
            <Typography>Добавьте новый курс</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
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
                            value={state.category}
                            onChange={inputChangeHandler}
                        >
                            <option disabled value="">Выберите категорию</option>
                            {categories.map(category => (
                                <option
                                    key={category.id}
                                    id={category.id.toString()}
                                    value={category.id}>
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
                                display: "block",
                                marginBottom: 5
                            }}
                        >
                            Преподаватели
                        </label>
                        <select
                            id="tutor"
                            name="tutor"
                            className="form-control"
                            value={state.tutor}
                            onChange={inputChangeHandler}
                        >
                            <option disabled value="">Выберите преподавателя</option>
                            {tutors.map(tutor => (
                                <option
                                    key={tutor.id}
                                    id={tutor.id.toString()}
                                    value={tutor.id}>
                                    {tutor.firstName} {tutor.lastName}
                                </option>
                            ))}
                        </select>
                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="title" label="Title"
                            value={state.title}
                            onChange={inputChangeHandler}
                            name="title"
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="price" label="Price"
                            value={state.price}
                            onChange={inputChangeHandler}
                            name="price"
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="duration" label="Duration"
                            value={state.duration}
                            onChange={inputChangeHandler}
                            name="duration"
                            required
                        />
                    </Grid>

                    <Grid item xs>
                        <Button
                            disabled={adding}
                            type="submit"
                        >
                            {adding ? <CircularProgress/> : 'Добавить курс'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <Button
                        onClick={openDialog}
                        type="button">Open Dialog for category form
                    </Button>
                </Grid>
            </Grid>

            <Grid container direction="column" spacing={2}>
                <Dialog
                    fullScreen={fullScreen}
                    open={isDialogueOpen}
                    onClose={closeDialog}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <CategoryForm onClose={closeDialog}/>
                    </DialogContent>
                </Dialog>
            </Grid>
        </>
    );
};

export default CourseForm;