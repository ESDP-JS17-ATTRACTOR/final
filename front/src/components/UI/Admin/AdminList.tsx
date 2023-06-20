import React from 'react';
import { useRouter } from 'next/router';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CategoryIcon from '@mui/icons-material/Category';

const AdminListItems = () => {
  const router = useRouter();

  return (
    <>
      <ListItemButton onClick={() => router.push('/admin/students')}>
        <ListItemIcon sx={{ minWidth: '35px' }}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Студенты" sx={{ fontSize: '15px' }} />
      </ListItemButton>

      <ListItemButton onClick={() => router.push('/admin/tutors')}>
        <ListItemIcon sx={{ minWidth: '35px' }}>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Преподаватели" />
      </ListItemButton>

      <ListItemButton className="categoryBtn" onClick={() => router.push('/admin/categories')}>
        <ListItemIcon sx={{ minWidth: '35px' }}>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Категории" />
      </ListItemButton>

      <ListItemButton className="categoryBtn" onClick={() => router.push('/admin/courses')}>
        <ListItemIcon sx={{ minWidth: '35px' }}>
          <AutoStoriesIcon />
        </ListItemIcon>
        <ListItemText primary="Курсы" />
      </ListItemButton>
    </>
  );
};
export default AdminListItems;
