import React, { useState } from 'react';
import { Avatar, Box, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout } from '@/features/users/usersThunks';
import { selectUser } from '@/features/users/usersSlice';
import { apiURL } from '../../../../constants';
import { ru } from '../../../../public/locales/ru/mainBlock';
import { en } from '../../../../public/locales/en/mainBlock';

const UsersMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const user = useAppSelector(selectUser);
  const t = router.locale === 'ru' ? ru : en;
  const avatar = user && user.avatar ? apiURL + '/' + user.avatar : null;
  const adminContent = [
    <MenuItem
      key="admin-menu"
      onClick={() => {
        router.push('/admin');
        handleClose();
      }}
    >
      {t.admin}
    </MenuItem>,
  ];
  const userContent = [
    <MenuItem
      key="my-profile"
      onClick={() => {
        router.push('/my-profile');
        handleClose();
      }}
    >
      {t.profile}
    </MenuItem>,
    <MenuItem
      key="my-courses"
      onClick={() => {
        router.push('/my-courses');
        handleClose();
      }}
    >
      {t.courses}
    </MenuItem>,
  ];

  const checkUsersRole = () => {
    if (user) {
      if (user.role === 'student' || user.role === 'tutor') {
        return userContent;
      }
      if (user.role === 'moderator' || user.role === 'admin') {
        return adminContent;
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await router.push('/');
  };

  return (
    <>
      <Box sx={{ display: 'flex' }} onClick={handleClick} color="inherit">
        <Avatar alt={'Avatar'} src={avatar!} />
      </Box>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {checkUsersRole()}
        <MenuItem onClick={handleLogout}>{t.logout}</MenuItem>
      </Menu>
    </>
  );
};

export default UsersMenu;
