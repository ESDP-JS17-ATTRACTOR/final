import React from 'react';
import { useRouter } from 'next/router';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CategoryIcon from '@mui/icons-material/Category';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';

const AdminListItems = () => {
  const router = useRouter();

  return (
    <>
      <ListItemButton onClick={() => router.push('/')}>
        <ListItemIcon sx={{ minWidth: '35px' }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Главная страница" sx={{ fontSize: '15px' }} />
      </ListItemButton>

      <ListItemButton onClick={() => router.push('/admin/students')}>
        <ListItemIcon sx={{ minWidth: '35px' }}>
          <SchoolIcon />
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
