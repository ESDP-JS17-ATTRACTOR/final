import React, { useState } from 'react';
import { ProfileMutation } from '../../../../types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { useRouter } from 'next/router';
import { editUserProfile } from '@/features/users/usersThunks';

interface Props {
  onCloseForm: () => void;
}

const FormForEditProfile: React.FC<Props> = ({ onCloseForm }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const initialState = user
    ? { email: user.email, firstName: user.firstName, country: user.country }
    : {
        email: '',
        firstName: '',
        country: '',
      };
  const [state, setState] = useState<ProfileMutation>(initialState);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(editUserProfile(state));
    await router.push('/my-profile');
    onCloseForm();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="profile-edit-form_box">
        <label>Email</label>
        <input
          type="email"
          id="Email"
          name="email"
          placeholder="Введите почтовый адрес"
          required={true}
          value={state.email}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="profile-edit-form_box">
        <label>First name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Введите имя"
          required={true}
          value={state.firstName}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="profile-edit-form_box">
        <label>Country</label>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="Введите страну проживания"
          required={true}
          value={state.country}
          onChange={inputChangeHandler}
        />
      </div>
      <button className="button profile-btn-save">Save</button>
    </form>
  );
};

export default FormForEditProfile;
