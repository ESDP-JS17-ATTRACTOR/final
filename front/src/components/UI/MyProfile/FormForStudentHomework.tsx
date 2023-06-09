import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ApiStudentHomework, StudentHomeworkMutation } from '../../../../types';
import FileInput from '@/components/FileInput/FileInput';
import { fetchHomeworks } from '@/features/homeworks/homeworksThunks';
import { selectHomeworks } from '@/features/homeworks/homeworksSlice';
import { Grid, MenuItem, TextField } from '@mui/material';
import { deleteStudentHomework, fetchStudentHomeworks } from '@/features/studentHomeworks/studentHomeworksThunks';

interface Props {
  onSubmit: (studentHomework: ApiStudentHomework) => void;
  error?: string[];
  closeModal: () => void;
}

const FormForStudentHomework: React.FC<Props> = ({ onSubmit, error, closeModal }) => {
  const dispatch = useAppDispatch();
  const homeworks = useAppSelector(selectHomeworks);
  const [selectedHomeworkId, setSelectedHomeworkId] = useState<string>('');
  const [studentHomework, setStudentHomework] = useState<StudentHomeworkMutation>({
    homework: '',
    studentFiles: null,
  });

  useEffect(() => {
    dispatch(fetchHomeworks());
  }, [dispatch]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentHomework((prev) => ({ ...prev, [name]: value }));
    setSelectedHomeworkId(value);
  };

  const onDeleteClickHandler = async () => {
    await dispatch(deleteStudentHomework(selectedHomeworkId));
    await dispatch(fetchStudentHomeworks());
    closeModal();
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...studentHomework,
      homework: studentHomework.homework,
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setStudentHomework((prevState) => ({
        ...prevState,
        [name]: files,
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
              select
              fullWidth
              sx={{ mb: 2 }}
              label="Введите номер домашнего задания"
              name="homework"
              required
              value={studentHomework.homework}
              onChange={inputChangeHandler}
            >
              <MenuItem disabled value="">
                Выберите урок
              </MenuItem>
              {homeworks.map((homework) => (
                <MenuItem key={homework.id} id={homework.id.toString()} value={homework.id}>
                  {homework.id}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </div>
      <FileInput onChange={fileInputChangeHandler} name="studentFiles" label="Files" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className="button profile-btn-add">
        Add
      </button>
      <button type="button" onClick={onDeleteClickHandler} className="button profile-btn-delete">
        Delete
      </button>
    </form>
  );
};

export default FormForStudentHomework;
