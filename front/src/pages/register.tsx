import React, {useState} from 'react';
import Layout from "@/components/Layout/Layout";
import {Avatar, Box, Container, Grid, TextField, Typography} from '@mui/material';
import {LoadingButton} from "@mui/lab";
import {RegisterMutation} from "../../types";
import {useRouter} from "next/router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";



const Register = () => {
    const router = useRouter();
    const [state, setState] = useState<RegisterMutation>({
        email: "",
        firstName: "",
        lastName: "",
        country: "",
        phoneNumber: "",
        password: "",
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await router.push('/');
        } catch (e) {
            // error happened
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    style={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    label="E-mail"
                                    name="email"
                                    autoComplete="new-email"
                                    value={state.email}
                                    fullWidth
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="firstName"
                                    label="First Name"
                                    type="text"
                                    autoComplete="new-password"
                                    value={state.firstName}
                                    fullWidth
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="lastName"
                                    label="Last Name"
                                    type="text"
                                    autoComplete="new-lastName"
                                    value={state.lastName}
                                    fullWidth
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="country"
                                    label="Country"
                                    type="text"
                                    autoComplete="new-country"
                                    value={state.country}
                                    fullWidth
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="phoneNumber"
                                    label="Phone Number"
                                    type="text"
                                    autoComplete="new-phoneNumber"
                                    value={state.phoneNumber}
                                    fullWidth
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={state.password}
                                    fullWidth
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                        </Grid>
                        <LoadingButton
                            loading={false}
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={false}
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;