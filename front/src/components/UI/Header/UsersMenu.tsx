import React, { useState } from 'react';
import { Avatar, Box, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout } from '@/features/users/usersThunks';
import { selectUser } from '@/features/users/usersSlice';

const UsersMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const user = useAppSelector(selectUser);
  const adminContent = [
    <MenuItem key="admin-menu" onClick={() => router.push('/admin')}>
      Admin Menu
    </MenuItem>,
  ];
  const userContent = [
    <MenuItem key="my-profile" onClick={() => router.push('/my-profile')}>
      My Profile
    </MenuItem>,
    <MenuItem key="my-courses" onClick={() => router.push('/my-courses')}>
      My Courses
    </MenuItem>,
    <MenuItem key="my-documents" onClick={() => router.push('/my-documents')}>
      My Documents
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
        <Avatar alt={'Avatar'} src={''} />
      </Box>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {checkUsersRole()}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UsersMenu;
