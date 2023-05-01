import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useRouter} from "next/router";
import {selectCategoryAddError, selectCategoryAdding} from "@/features/categories/categoriesSlice";
import {ApiHomework, HomeworkMutation} from "../../../../types";
import FileInput from "@/components/FileInput/FileInput";
import {selectLessons} from "@/features/lessons/lessonsSlice";
import {fetchLessons} from "@/features/lessons/lessonsThunks";

interface Props {
    onSubmit: (homework: ApiHomework) => void;
}

const FormForHomework: React.FC<Props> = ({onSubmit}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isAdding = useAppSelector(selectCategoryAdding);
    const error = useAppSelector(selectCategoryAddError);
    const lessons = useAppSelector(selectLessons);
    const [homework, setHomework] = useState<HomeworkMutation>({
        lesson: '',
        title: '',
        description: '',
        // pdf: null
    });

    useEffect(() => {
        dispatch(fetchLessons());
    }, [dispatch]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setHomework(prev => ({...prev, [name]: value}));
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...homework,
            lesson: parseFloat(homework.lesson),
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setHomework((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
            setHomework((prevState) => ({
                ...prevState,
                [name]: null,
            }));
        }
    };

    return (
            <form onSubmit={onFormSubmit}>
                <div className="profile-add-homework-form_box">
                    <label>
                        Lessons
                    </label>
                    <select
                        id="lesson"
                        name="lesson"
                        required
                        value={homework.lesson}
                        onChange={inputChangeHandler}
                    >
                        <option disabled value="">Выберите урок</option>
                        {lessons.map(lesson => (
                            <option
                                key={lesson.id}
                                id={lesson.id.toString()}
                                value={lesson.id}>
                                {lesson.title}
                            </option>
                        ))}
                    </select>
                    <label>Title</label>
                    <input
                        type="title"
                        id="Title"
                        name="title"
                        placeholder="Введите заголовок"
                        required={true}
                        value={homework.title}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="profile-add-homework-form_box">
                    <label>Description</label>
                    <input
                        type="description"
                        id="description"
                        name="description"
                        placeholder="Введите описание"
                        required={true}
                        value={homework.description}
                        onChange={inputChangeHandler}
                    />
                </div>
                <FileInput onChange={fileInputChangeHandler} name="pdf" label="Pdf" />
                <button className="button profile-btn-add">Add</button>
            </form>
    );
};

export default FormForHomework;