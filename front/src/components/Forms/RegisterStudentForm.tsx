import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRegisterStudentError, selectRegisterStudentLoading } from '@/features/users/usersSlice';
import { registerNewStudent } from '@/features/users/usersThunks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterStudentForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterStudentLoading);
  const error = useAppSelector(selectRegisterStudentError);
  const [email, setEmail] = useState('');

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(registerNewStudent(email)).unwrap();
    onClose();
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.[fieldName].valueOf();
    } catch {
      return undefined;
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '16px' }}>Регистрация нового студента</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={submitForm}>
          <TextField
            sx={{ mb: 4 }}
            name="email"
            label="E-mail"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(getFieldError('email'))}
            helperText={getFieldError('email')}
          />
          <LoadingButton loading={loading} disabled={loading} type="submit" fullWidth variant="contained">
            Регистрация
          </LoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterStudentForm;
