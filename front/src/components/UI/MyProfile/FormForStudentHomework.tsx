import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useRouter} from "next/router";
import {ApiStudentHomework, StudentHomeworkMutation} from "../../../../types";
import FileInput from "@/components/FileInput/FileInput";
import {fetchHomeworks} from "@/features/homeworks/homeworksThunks";
import {selectHomeworks} from "@/features/homeworks/homeworksSlice";
import {Grid, MenuItem, TextField} from "@mui/material";

interface Props {
    onSubmit: (studentHomework: ApiStudentHomework) => void;
}

const FormForStudentHomework: React.FC<Props> = ({onSubmit}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const homeworks = useAppSelector(selectHomeworks);
    const [studentHomework, setStudentHomework] = useState<StudentHomeworkMutation>({
        homework: '',
    });

    useEffect(() => {
        dispatch(fetchHomeworks());
    }, [dispatch]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setStudentHomework(prev => ({...prev, [name]: value}));
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...studentHomework,
            homework: parseFloat(studentHomework.homework),
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setStudentHomework((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
            setStudentHomework((prevState) => ({
                ...prevState,
                [name]: null,
            }));
        }
    };

    return (
        <form className="profile-add-homework-form" onSubmit={onFormSubmit}>
            <div className="profile-add-homework-form_box">
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                    <TextField
                    fullWidth
                    sx={{mb: 2}}
                    select
                    label="Введите номер домашнего задания"
                    name="homework"
                    required
                    value={studentHomework.homework}
                    onChange={inputChangeHandler}
                  >
                    <MenuItem disabled value="">Выберите урок</MenuItem>
                    {homeworks.map(homework => (
                        <MenuItem
                            key={homework.id}
                            id={homework.id.toString()}
                            value={homework.id}>
                            {homework.id}
                        </MenuItem>
                    ))}
                  </TextField>
                    </Grid>
                </Grid>
            </div>
            <FileInput onChange={fileInputChangeHandler} name="files" label="Files" />
            <button className="button profile-btn-add">Add</button>
        </form>
    );
};

export default FormForStudentHomework;