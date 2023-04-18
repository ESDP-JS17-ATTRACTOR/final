import React, {useState} from 'react';
import {Box, Button, Menu, MenuItem} from '@mui/material';
import {Avatar} from "@mui/material";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectUser} from "@/features/users/usersSlice";
import {logout} from "@/features/users/usersThunks";

const UsersMenu = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
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
            <Box sx={{display: "flex"}}>
                <Button
                    onClick={handleClick}
                    color="inherit"
                >
                    Hello, {user?.firstName}
                </Button>
                <Avatar alt={"Avatar"} src={""}/>
            </Box>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => router.push('/my_profile')}>My Profile</MenuItem>
                <MenuItem onClick={() => router.push('/my_documents')}>My Documents</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UsersMenu;