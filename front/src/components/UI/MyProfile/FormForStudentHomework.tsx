import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useRouter} from "next/router";
import {selectCategoryAddError, selectCategoryAdding} from "@/features/categories/categoriesSlice";
import {ApiHomework, ApiStudentHomework, HomeworkMutation, StudentHomeworkMutation} from "../../../../types";
import FileInput from "@/components/FileInput/FileInput";
import {selectLessons} from "@/features/lessons/lessonsSlice";
import {fetchLessons} from "@/features/lessons/lessonsThunks";
import {fetchHomeworks} from "@/features/homeworks/homeworksThunks";
import {selectHomework, selectHomeworks} from "@/features/homeworks/homeworksSlice";

interface Props {
    onSubmit: (studentHomework: ApiStudentHomework) => void;
}

const FormForStudentHomework: React.FC<Props> = ({onSubmit}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isAdding = useAppSelector(selectCategoryAdding);
    const error = useAppSelector(selectCategoryAddError);
    const homeworks = useAppSelector(selectHomeworks);
    const [studentHomework, setStudentHomework] = useState<StudentHomeworkMutation>({
        homework: '',
    });

    useEffect(() => {
        dispatch(fetchHomeworks());
    }, [dispatch]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <form onSubmit={onFormSubmit}>
            <div className="profile-add-homework-form_box">
                <label>
                    Homeworks
                </label>
                <select
                    id="homework"
                    name="homework"
                    required
                    value={studentHomework.homework}
                    onChange={inputChangeHandler}
                >
                    <option disabled value="">Выберите урок</option>
                    {homeworks.map(homework => (
                        <option
                            key={homework.id}
                            id={homework.id.toString()}
                            value={homework.id}>
                            {homework.id}
                        </option>
                    ))}
                </select>
            </div>
            <FileInput onChange={fileInputChangeHandler} name="files" label="Files" />
            <button className="button profile-btn-add">Add</button>
        </form>
    );
};

export default FormForStudentHomework;