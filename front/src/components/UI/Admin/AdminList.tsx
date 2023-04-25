import React from "react";
import {useRouter} from "next/router";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CategoryIcon from '@mui/icons-material/Category';


const AdminListItems = () => {
    const router = useRouter();

    return (
        <>
            <ListItemButton
                onClick={() => router.push('/admin/students')}
            >
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Студенты"/>
            </ListItemButton>

            <ListItemButton
                onClick={() => router.push('/admin/tutors')}
            >
                <ListItemIcon>
                    <GroupsIcon/>
                </ListItemIcon>
                <ListItemText primary="Преподаватели"/>
            </ListItemButton>

            <ListItemButton
                onClick={() => router.push('/admin/courses')}
            >
                <ListItemIcon>
                    <AutoStoriesIcon/>
                </ListItemIcon>
                <ListItemText primary="Курсы"/>
            </ListItemButton>
            <ListItemButton
                onClick={() => router.push('/admin/categories')}
            >
                <ListItemIcon>
                    <CategoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Категории"/>
            </ListItemButton>
        </>
    );
};
export default AdminListItems;
